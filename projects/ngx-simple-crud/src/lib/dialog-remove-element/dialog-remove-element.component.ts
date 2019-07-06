import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

interface ActionButton {
  color?: 'primary'|'warn'|'accent';
  icon?: string;
  text?: string;
  handle: (dialog: DialogRemoveElementComponent) => any;
}

export interface RemoveDialogDataInterface {
  title?: string;
  message?: string;
  element: any;
  buttons?: ActionButton[];
}

@Component({
  selector: 'simple-crud-dialog-remove-element',
  templateUrl: './dialog-remove-element.component.html',
  styleUrls: ['./dialog-remove-element.component.css']
})
export class DialogRemoveElementComponent implements OnInit {

  loading: boolean;
  error: HttpErrorResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: RemoveDialogDataInterface, public dialogRef: MatDialogRef<DialogRemoveElementComponent>) { }

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
