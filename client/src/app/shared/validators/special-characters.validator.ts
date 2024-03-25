import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const regex = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);

export function specialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = regex.test(control.value);
    return forbidden ? { specialCharacters: { value: control.value } } : null;
  };
}
