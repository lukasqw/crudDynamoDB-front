import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent implements OnInit {
  dataForm!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit(): any;

  onSubmit() {
    if (this.dataForm.valid) {
      this.submit();
    } else {
      console.log('invalid Form');
      this.checkValidationForm(this.dataForm);
    }
  }

  checkValidationForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkValidationForm(control);
      }
    });
  }

  reset() {
    this.dataForm.reset();
  }

  checkValidTouched(field: string) {
    const res =  !this.dataForm.get(field)?.valid &&
    (this.dataForm?.get(field)?.touched || this.dataForm?.get(field)?.dirty)
    return res;
  }

  checkRequired(field: string) {
    const res = this.dataForm.get(field)?.hasError('required') &&
    (this.dataForm.get(field)?.touched || this.dataForm.get(field)?.dirty)
    return res;
  }

  applyCssError(field: string) {
    const res = {
      'has-required': this.dataForm.get(field)?.hasError('required'),
      'has-error': this.checkValidTouched(field),
      'has-feedback': this.checkValidTouched(field)
    }
    return res;
  }
}
