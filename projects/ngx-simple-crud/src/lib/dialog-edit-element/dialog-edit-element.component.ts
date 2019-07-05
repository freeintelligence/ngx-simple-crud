import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: DataInterface, public dialogRef: MatDialogRef<DialogEditElementComponent>) { }

  ngOnInit() {
  }

  handle(button: ActionButton) {
    return button.handle(this);
  }

}
