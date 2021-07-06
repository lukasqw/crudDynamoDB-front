import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputChipComponent),
  multi: true
};

@Component({
  selector: 'app-input-chip',
  templateUrl: './input-chip.component.html',
  styleUrls: ['./input-chip.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputChipComponent implements ControlValueAccessor {
  faExclamation = faExclamation;
  // Chip list
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() classCss: any;
  @Input() id!: string;
  @Input() label?: string;
  @Input() control: any;
  @Input() isReadOnly = false;
  @Input() placeholder = '';

  private innerValue: string[] = [];

  get values() {
    return this.innerValue;
  }

  set values(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.values = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  // Chip list
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const newValues = this.values;
    if (value) {
      newValues.push(value);
    }
    event.chipInput!.clear();
    this.onChangeCb(newValues);
  }

  remove(value: String): void {
    const index = this.values.indexOf(value);
    const newValues = this.values;

    if (index >= 0) {
      newValues.splice(index, 1);
    }

    this.onChangeCb(newValues);
  }
}
