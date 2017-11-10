import {Enhancer, EnhanceableComponent} from "./enhance";

/**
 * Create a new state value and mutation method pairing.
 */
export function addStateValue<T = any>(name: string, methodName: string, defaultValue: T = null): Enhancer {
  return function(component) {
    component.state[name] = defaultValue;
    component.methods[methodName] = setValue;
    component[methodName] = setValue;

    function setValue(newVal: T) {
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
 * Generic method that can match any function signature with the exception
 * of the first argument, which is the enhanced component the method is
 * attached to.
 */
export interface CustomMethod {
  (component: EnhanceableComponent<any>, ...args: any[]): any;
}

/**
 * Create a generic method.
 */
export function addMethod(name: string, fn: CustomMethod): Enhancer {
  return function(component) {
    component.methods[name] = (...args: any[]) => fn(component, ...args);
  };
}