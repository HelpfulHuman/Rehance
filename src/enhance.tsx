import * as React from "react";

export interface ValueFactory<Props = any, ValueType = any> {
  (Component: React.Component<Props>): ValueType;
}

export type ValueFactories<Values, Props> = {
  [key in keyof Values]: ValueFactory<Props, Values[key]>;
};

export interface StaticMethod<V, P> {
  (values: V, props: P): any;
};

export type StaticMethods<M, V, P> = {
  [key in keyof M]: StaticMethod<V, P>;
};

export type WrappedStaticMethods<Methods> = {
  [key in keyof Methods]: {(): any};
};

export interface ComponentFactory<ChildProps, OwnProps> {
  (Component: React.ComponentType<ChildProps>): React.ComponentType<OwnProps>;
}

/**
 * Creates a new component that tracks the state of the given fields and builds and
 * provides the static methods that have been defined (if any).
 */
export function enhanceWith<
  OwnProps  = {},
  Values    = {},
  Methods   = {},
>(
  values: ValueFactories<Values, OwnProps>,
  methods: StaticMethods<Methods, Values, OwnProps> = {} as any,
): ComponentFactory<OwnProps & Values & WrappedStaticMethods<Methods>, OwnProps> {
  return function (Component) {
    return class extends React.Component<OwnProps> {

      // The stateful values that are passed down to render() and
      // static methods.
      values: Values = {} as any;

      methods: WrappedStaticMethods<Methods> = {} as any;

      constructor(props, context) {
        super(props, context);

        // hard-bind of our given static methods
        for (var m in methods) {
          let _method = methods[m];
          this.methods[m] = () => _method(this.values, this.props);
        }

        // create the values from the value factories
        for (var v in values) {
          var createValue = values[v];
          this.values[v] = createValue(this);
        }
      }

      render() {
        var { children, ...props } = this.props as any;

        return (
          <Component
            {...props}
            {...this.values}
            {...this.methods}>
            {children}
          </Component>
        );
      }

    };
  };
}


type Values = {
  foo: {
    readonly value: string;
  }
};

enhanceWith<any, Values>({
  foo: (Component) => ({
    get value() { return "hello" },
  }),
}, {
  bar(values) {
    values.foo.value;
  }
})(function (props) {

  return (
    <div></div>
  );
});