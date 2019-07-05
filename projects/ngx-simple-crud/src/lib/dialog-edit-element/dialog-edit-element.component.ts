import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

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
