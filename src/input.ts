import { ValueFactory } from ".";

export type InputType =
  | "text"
  | "numeric"
  | "email"
  | "password"
  | "date"
  | "checkbox"
  | "radio";

export function input(type: InputType): ValueFactory {
  return function (Component) {
    var _ref: React.ReactInstance = null;
    var _val: any;
    var _dirty: boolean = false;

    function onChange(val: any): void {
      _val = val;
      _dirty = true;
      Component.forceUpdate();
    }

    function onFocus() {

    }

    function onBlur() {}

    function bindRef(ref: React.ReactInstance) {
      _ref = ref;
    }

    return {
      type: type,
      get value() {
        return _val;
      },
    };
  };
}

// export class InputValue {

//   private _comp: React.Component;
//   private _type: InputType;
//   private _ref: React.ReactInstance = null;

//   constructor(component: React.Component, type: InputType) {
//     this._comp = component;
//     this._type = type;
//     this.bindRef = this.bindRef.bind(this);
//   }

//   bindRef(ref: React.ReactInstance): void {
//     this._ref = ref;
//   }

// }