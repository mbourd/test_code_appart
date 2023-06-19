import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export class FormValidators {
  static confirmPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): any => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (
        password.value &&
        confirmPassword.value &&
        password.value !== confirmPassword.value
      ) {
        password.markAsDirty();
        confirmPassword.markAsDirty();
        confirmPassword.setErrors({ confirmPassword: true });
      }

      if (password.value && password.value.length < 4) {
        password.markAsDirty();
        password.setErrors({ minLengthPassword: true });
      }

      if (confirmPassword.value && confirmPassword.value.length < 4) {
        confirmPassword.markAsDirty();
        confirmPassword.setErrors({ minLengthPassword: true });
      }

      if (
        confirmPassword.value &&
        confirmPassword.value.length >= 4 &&
        password.value &&
        password.value.length >= 4
      ) {
        password.setErrors(null);
        confirmPassword.setErrors(null);
      }

      if (
        confirmPassword.value &&
        confirmPassword.value.length >= 4 &&
        password.value &&
        password.value.length >= 4 &&
        password.value !== confirmPassword.value
      ) {
        confirmPassword.setErrors({ confirmPassword: true });
      }
    };
  }
}
