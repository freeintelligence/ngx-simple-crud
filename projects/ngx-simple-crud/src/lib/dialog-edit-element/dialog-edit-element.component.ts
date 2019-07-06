import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
    type: 'input'|'select';
    subtype?: 'text'|'number';
    options?: { value: any, description: string }[];
    validators?: ValidatorFn[];
    disabled?: boolean;
    width?: string;
  }[];
}

@Component({
  selector: 'simple-crud-dialog-edit-element',
  templateUrl: './dialog-edit-element.component.html',
  styleUrls: ['./dialog-edit-element.component.css']
})
export class DialogEditElementComponent implements OnInit {

  loading: boolean;
  error: HttpErrorResponse;
  form: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditDialogDataInterface, public dialogRef: MatDialogRef<DialogEditElementComponent>) { }

  ngOnInit() {
    this.addControls();
  }

  addControls() {
    for (const control of this.data.controls) {
      this.form.addControl(control.key, new FormControl({ value: this.data.element[control.key], disabled: control.disabled }, control.validators));
    }
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

}
