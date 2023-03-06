import { FormGroup } from "@angular/forms";

export function passwordMatchValidator(registerForm: FormGroup) {

  // guardo en 'password' el input 'password':
  const password = registerForm.get('password');
  // guardo en 'password2' el input 'password2':
  const password2 = registerForm.get('password2');

  // si el valor del input 'password' = valor del input 'password2':
  if (password?.value !== password2?.value) {
    password2?.setErrors({ passwordMatch: true });
  } else {
    password2?.setErrors(null);
  }
}
