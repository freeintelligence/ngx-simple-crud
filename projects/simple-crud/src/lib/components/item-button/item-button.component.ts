import { Component, OnInit, Input } from '@angular/core';
import { ItemButton } from '../../interfaces/item-button.interface';

@Component({
  selector: 'simple-crud-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.css']
})
export class ItemButtonComponent implements OnInit {

  @Input('element') element: any;
  @Input('button') button: ItemButton;

  constructor() { }

  ngOnInit(): void {
  }

  disabled(): boolean {
    if (typeof this.button.disabled === 'function') {
      return this.button.disabled(this.element);
    }

    return false;
  }

  hidden(): boolean {
    if (typeof this.button.hidden === 'function') {
      return this.button.hidden(this.element);
    }

    return false;
  }

  handle(): any {
    if (typeof this.button.handle === 'function') {
      return this.button.handle(this.element);
    }
  }

}
