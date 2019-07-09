import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';

interface ActionButton {
  color?: 'primary'|'warn'|'accent';
  icon?: string;
  text?: string;
  handle: (dialog: DialogEditElementComponent, invalid: boolean) => any;
}

export interface EditDialogDataInterface {
  title?: string;
  element: any;
  buttons?: ActionButton[];
  controls: {
    label?: string;
    key: string;
    type: 'input'|'select'|'chips';
    subtype?: 'text'|'number'|'email'|'password';
    options?: { value: any, description: string }[];
    validators?: ValidatorFn[];
    disabled?: boolean;
    width?: string;
    chipsSeparatorKeysCodes?: any[],
  }[];
}

@Component({
  selector: 'simple-crud-dialog-edit-element',
  templateUrl: './dialog-edit-element.component.html',
  styleUrls: ['./dialog-edit-element.component.css', './../styles.scss']
})
export class DialogEditElementComponent implements OnInit {

  loading: boolean;
  error: HttpErrorResponse;
  form: FormGroup = new FormGroup({});

  readonly separatorKeysCodes: number[] = [ ENTER, COMMA, SPACE ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditDialogDataInterface, public dialogRef: MatDialogRef<DialogEditElementComponent>) { }

  ngOnInit() {
    this.addControls();
  }

  addControls() {
    for (const control of this.data.controls) {
      this.form.addControl(control.key, new FormControl({
        value: this.getFirstControlValue(control),
        disabled: control.disabled
      }, control.validators));
    }
  }

  getFirstControlValue(control: EditDialogDataInterface['controls'][0]) {
    if (control.type === 'chips' && (typeof this.data.element[control.key] === 'undefined' || this.data.element[control.key] === null)) {
      return [];
    }

    return this.data.element[control.key];
  }

  async handle(button: ActionButton) {
    this.form.markAllAsTouched();
    const invalid = this.form.invalid;

    this.form.disable();
    this.loading = true;
    this.error = undefined;

    try {
      await button.handle(this, invalid);
    } catch (err) {
      this.error = err;
    }

    this.loading = false;

    this.data.controls.forEach(control => !control.disabled ? this.form.controls[control.key].enable() : null);
  }

  async removeChip(controlName: string, element: string) {
    const container: string[] = this.form.controls[controlName].value instanceof Array ? this.form.controls[controlName].value : [];
    const index = container.indexOf(element);

    if (index >= 0) {
      container.splice(index, 1);
      this.form.controls[controlName].setValue(container);
    }
  }

  async add(controlName: string, event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (!(this.form.controls[controlName].value instanceof Array)) {
        this.form.controls[controlName].setValue([ value ]);
      } else {
        const current = this.form.controls[controlName].value;
        current.push(value);

        this.form.controls[controlName].setValue(current);
      }
    }

    if (input) {
      input.value = '';
    }
  }

}
