import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputStarRantingComponent),
  multi: true
};

@Component({
  selector: 'app-input-star-ranting',
  templateUrl: './input-star-ranting.component.html',
  styleUrls: ['./input-star-ranting.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputStarRantingComponent implements ControlValueAccessor {
  // Stars Ranting
  starCount = 5;
  ratingArr: boolean[] = Array(this.starCount).fill(false);

  @Input() classCss: any;
  @Input() label?: string;
  @Input() control: any;

  private innerValue: number = 1;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  // Stars Ranting
  returnStar(i: number) {
    if (this.value >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClickStar(i: number) {
    this.value = i + 1;
  }
}
