import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';

interface ActionButton {
  color?: 'primary'|'warn'|'accent';
  icon?: string;
  text?: string;
  handle: (dialog: DialogEditElementComponent) => any;
}

export interface DataInterface {
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
  }[];
}

@Component({
  selector: 'simple-crud-dialog-edit-element',
  templateUrl: './dialog-edit-element.component.html',
  styleUrls: ['./dialog-edit-element.component.css']
})
export class DialogEditElementComponent implements OnInit {

  loading: boolean;
  error: Error;
  form: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: DataInterface, public dialogRef: MatDialogRef<DialogEditElementComponent>) { }

  ngOnInit() {
    this.addControls();
  }

  addControls() {
    for (const control of this.data.controls) {
      this.form.addControl(control.key, new FormControl({ value: this.data.element[control.key], disabled: control.disabled }, control.validators));
    }
  }

  async handle(button: ActionButton) {
    this.loading = true;
    this.error = undefined;

    try {
      await button.handle(this);
    } catch (err) {
      this.error = err;
    }

    this.loading = false;
  }

}
