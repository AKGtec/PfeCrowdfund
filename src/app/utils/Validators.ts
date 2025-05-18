import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (abstractControl: AbstractControl): ValidationErrors | null => {
    const control = abstractControl.get(controlName);
    const matchingControl = abstractControl.get(matchingControlName);

    if (matchingControl?.errors && !matchingControl.errors['mismatch']) {
      return null;
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
}