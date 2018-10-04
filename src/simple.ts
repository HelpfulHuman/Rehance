import { ValueFactory } from "./enhance";

export type DefaultFromProps<Type, Props> =
  | Type
  | { (props: Props): Type };

export type SimpleValue<Type> = {
  readonly value: Type;
  set(newValue: Type): void;
};

/**
 * Creates a simple value binding that will cause a re-render of the component when
 * the `set()` method is used.
 */
export function simple<Type = any, Props = any>(
  defaultValue: DefaultFromProps<Type, Props>,
): ValueFactory<Props, SimpleValue<Type>> {
  return function (Component) {
    var _value = (
      typeof defaultValue === "function" ?
      defaultValue(Component.props) :
      defaultValue
    );

    return {
      get value(): Type {
        return _value;
      },
      set(newValue: Type) {
        _value = newValue;
        Component.forceUpdate();
      },
    };
  };
}