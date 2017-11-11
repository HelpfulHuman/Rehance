import * as React from "react";
import {EnhancedComponent} from "./enhance";

/**
 * Creates a method that will invoke setState for the given field name.
 */
export function bindSetState(component: EnhancedComponent, name: string): (value: any) => void {
  return function (value) {
    component.setState({ [name]: value });
  };
}

/**
 * Creates a method that will map an input field's onChange value to a
 * specified state field.
 */
export function bindInputChange(component: EnhancedComponent, name: string): (ev: any) => void {
  return function (ev) {
    component.setState({ [name]: ev.currentTarget.value });
  };
}

/**
 * Create and returns a function that will bind an input component reference
 * to a list of inputRefs, which can be queried using getInputValues().
 */
export function bindInputRef(component: EnhancedComponent, name: string): (c: any) => void {
  return function (c) {
    component.inputRefs[name] = c;
  };
}

/**
 * Generates an object using the values in the input fields that have
 * been added by the bindInputRef() method.
 */
export function getInputValues({inputRefs}: EnhancedComponent): object {
  var output = {};
  for (var key in inputRefs[key]) {
    output[key] = (inputRefs[key] ? inputRefs[key].value : null);
  }
  return output;
}