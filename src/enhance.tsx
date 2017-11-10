import * as React from "react";

export interface ReferenceElement {
  value: any;
}

export interface ReferenceBinder {
  (component: ReferenceElement): void;
}

export interface EnhanceableComponent<P> {
  props: P;
  state: object;
  methods: object;
  hooks: object;
  inputs: {[key: string]: ReferenceElement};
  inputBinders: {[key: string]: ReferenceBinder};
  setState(f: (prevState: object, props: object) => any, callback?: () => any): void;
  setState(state: any, callback?: () => any): void;
}

export interface Enhancer<P = any> {
  (component: EnhanceableComponent<P>): void;
}

export interface ComponentFactory<P> {
  (Component: React.Component): React.Component<P>;
}

export function enhance<P = any>(...enhancers: Enhancer<P>[]): ComponentFactory<P> {
  return function(Component) {
    return class extends React.PureComponent<P> implements EnhanceableComponent<P> {

      state         = {};
      methods       = {};
      hooks         = {};
      inputs        = {};
      inputBinders  = {};

      constructor(props, context) {
        super(props, context);
        this.getInputValues = this.getInputValues.bind(this);
        for (var i = 0; i < enhancers.length; i++) {
          enhancers[i](this);
        }
      }

      /**
       * Returns the values from any bound input elements as a single
       * JS object.
       */
      getInputValues<T = object>(): T {
        var input = {};
        for (var key in this.inputs) {
          input[key] = this.inputs[key].value;
        }
        return input as T;
      }

      render() {
        var { children, ...props } = this.props as any;
        return (
          <Component
            bindInput={this.inputBinders}
            getInputValues={this.getInputValues}
            {...this.state}
            {...this.methods}
            {...props}>
            {children}
          </Component>
        );
      }

    };
  } as any;
}