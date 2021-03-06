import * as React from "react";

export interface EnhancedComponent<P, S> extends React.Component<P, S> {
  inputRefs: object;
}

export interface ComponentFactory<P, S> {
  (Component: React.ComponentClass<P>|React.StatelessComponent<P>): React.ComponentClass<P>;
}

export interface GetDefaultState<P, S> {
  (props: P): S;
}

export interface MapStaticMethods<P, S> {
  (component: EnhancedComponent<P, S>): object;
}

export interface LifecycleHooks<P, S> {
  willMount?: () => void;
  didMount?: () => void;
  willUnmount?: () => void;
  willReceiveProps?: (nextProps: P) => void;
  willUpdate?: (nextProps: P, nextState: S) => void;
  didUpdate?: (nextProps: P, nextState: S) => void;
  didCatch?: (err: Error) => void;
}

export interface MapLifecycleHooks<P, S> {
  (component: EnhancedComponent<P, S>): LifecycleHooks<P, S>;
}

/**
 * Capitalizes the first letter of the given string.
 */
export function capitalize(str: string): string {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

/**
 * Create a new component that uses treats its state as its own,
 * miniature reducer.
 */
export function enhanceWith<P = any, S = any>(
  getDefaultState?: GetDefaultState<P, S>,
  mapStaticMethods?: MapStaticMethods<P, S>,
  mapLifecycleHooks?: MapLifecycleHooks<P, S>
): ComponentFactory<P, S> {
  return function(Component) {

    return class extends React.PureComponent<P, S> implements EnhancedComponent<P, S> {

      private methods: object = {};
      public inputRefs: object = {};

      constructor(props, context) {
        super(props, context);

        if (getDefaultState) {
          this.state = getDefaultState(props);
        }

        if (mapStaticMethods) {
          this.methods = mapStaticMethods(this);
        }

        if (mapLifecycleHooks) {
          var hooks = mapLifecycleHooks(this);
          for (var name in hooks) {
            var fullName    = ("component" + capitalize(name));
            this[fullName]  = hooks[name](this);
          }
        }
      }

      render() {
        var {children, ...props} = this.props as any;

        return (
          <Component
            {...props}
            {...this.state}
            {...this.methods}>
            {children}
          </Component>
        );
      }

    }
  };
}