import * as React from "react";

/**
 * Creates a method that will invoke setState for the given field name.
 */
export function bindSetState(component: React.Component, name: string): (value: any) => void {
  return function (value) {
    component.setState({ [name]: value });
  };
}

/**
 * Creates a method that will map an input field's onChange value to a
 * specified state field.
 */
export function bindInputChange(component: React.Component, name: string): (ev: any) => void {
  return function (ev) {
    component.setState({ [name]: ev.currentTarget.value });
  };
}