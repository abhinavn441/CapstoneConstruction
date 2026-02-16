import { Form } from '@angular/forms';
import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './IUnsaved';

export const unsavedComponentGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate? component.canDeactivate() : true;
};
