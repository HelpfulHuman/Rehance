import * as React from "react";
import {EnhancedComponent} from "./enhance";

/**
 * Creates a method that will invoke setState for the given field name.
 */
export function bindSetState<P = any, S = any>(component: EnhancedComponent<P, S>, name: string): (value: any) => void {
  return function (value) {
    component.setState({ [name]: value } as any);
  };
}

/**
 * Creates a method that will map an input field's onChange value to a
 * specified state field.
 */
export function bindInputChange<P = any, S = any>(component: EnhancedComponent<P, S>, name: string): (ev: any) => void {
  return function (ev) {
    component.setState({ [name]: ev.currentTarget.value } as any);
  };
}

/**
 * Create and returns a function that will bind an input component reference
 * to a list of inputRefs, which can be queried using getInputValues().
 */
export function bindInputRef<P = any, S = any>(component: EnhancedComponent<P, S>, name: string): (c: any) => void {
  return function (c) {
    component.inputRefs[name] = c;
  };
}

/**
 * Generates an object using the values in the input fields that have
 * been added by the bindInputRef() method.
 */
export function getInputValues<P = any, S = any>({inputRefs}: EnhancedComponent<P, S>): object {
  var output = {};
  for (var key in inputRefs[key]) {
    output[key] = (inputRefs[key] ? inputRefs[key].value : null);
  }
  return output;
}