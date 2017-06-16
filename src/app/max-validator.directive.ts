import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[max]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})

export class MaxValidatorDirective implements Validator{

  @Input() max: number;

  validate(control: AbstractControl): {[key: string]: any} {
    const currentValue = parseInt(control.value);
    const isValid = currentValue <= this.max;
    return isValid ? null: {
      max: {
        valid: false
      }
    }
  }

  constructor() { }

}
