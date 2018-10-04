import { ValueFactory } from "./enhance";

export type RefValue<Type, ElementType> = {
  readonly value: Type;
  readonly element: any;
  ref(el: ElementType): void;
};

export interface ValueFormatter<Type, ElementType> {
  (el: ElementType): Type;
}

/**
 * Creates a new value type for tracking references to a component's element.
 */
export function byRef<Type = any, ElementType = React.ReactInstance>(
  getValue: ValueFormatter<Type, ElementType> = (el) => null,
): ValueFactory<any, RefValue<Type, ElementType>> {
  return function (Component) {
    var _el;

    return {
      get value() {
        return getValue(_el);
      },
      get element() {
        return _el;
      },
      ref(el) {
        _el = el;
      },
    };
  };
}