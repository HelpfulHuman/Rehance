import {Enhancer} from "./enhance";

/**
 * Create a new state value and mutation method pairing.
 */
export function addState<T = any>(name: string, methodName: string, defaultValue: T = null): Enhancer {
  return function(component) {
    component.state[name] = defaultValue;
    component.methods[methodName] = function(newVal: T) {
      component.setState({ [name]: newVal });
    };
  };
}

/**
 * Create performant reference bindings for input components.
 */
export function addInput(name: string, bindRefMethodName?: string): Enhancer {
  if (!bindRefMethodName) {
    bindRefMethodName = name;
  }

  return function(component) {
    component.inputBinders[bindRefMethodName] = function (el) {
      component.inputs[name] = el;
    };
  };
}

/**
 * Create a generic method.
 */
export function addMethod(name: string, fn: (props: any, state: any) => void): Enhancer {
  return function(component) {
    component.methods[name] = function() {
      fn(component.props, component.state);
    };
  };
}