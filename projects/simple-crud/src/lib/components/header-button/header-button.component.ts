import { Component, OnInit, Input } from '@angular/core';
import { HeaderButton } from '../../interfaces/header-button.interface';

@Component({
  selector: 'simple-crud-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent implements OnInit {

  @Input('button') button: HeaderButton;

  constructor() { }

  ngOnInit(): void {
  }

  handle(): any {
    if (typeof this.button.handle === 'function') {
      return this.button.handle();
    }
  }

}
