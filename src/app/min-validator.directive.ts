import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[min]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})

export class MinValidatorDirective implements Validator{

  @Input() min: number;

  validate(control: AbstractControl): {[key: string]: any} {
    const currentValue = parseInt(control.value);
    const isValid = currentValue >= this.min;
    return isValid ? null: {
      min: {
        valid: false
      }
    }
  }

  constructor() { }

}
