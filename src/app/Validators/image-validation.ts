import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class ImageValidation {
  validate(formControl: FormControl): ValidationErrors | null {
    const str = formControl.value;
    if (!str) return null;
    if (
      str.toLowerCase().includes('http://') ||
      str.toLowerCase().includes('https://')
    ) {
      return null;
    } else {
      return { notValidUrl: true };
    }
  }
}
