import { Component, OnInit, Input } from '@angular/core';
import { ItemButton } from '../../interfaces/item-button.interface';

@Component({
  selector: 'simple-crud-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.css']
})
export class ItemButtonComponent implements OnInit {

  @Input('button') button: ItemButton;

  constructor() { }

  ngOnInit(): void {
  }

}
