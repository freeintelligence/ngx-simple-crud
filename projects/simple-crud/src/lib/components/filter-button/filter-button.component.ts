import { Component, OnInit, Input } from '@angular/core';
import { FilterButton } from '../../interfaces/filter-button.interface';
import { FilterField } from '../../interfaces/filter-field.interface';
import { Utils } from '../../utils';

@Component({
  selector: 'simple-crud-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css']
})
export class FilterButtonComponent implements OnInit {

  @Input('button') button: FilterButton;
  @Input('filterFields') filterFields: FilterField[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  disabled(): boolean {
    if (typeof this.button.disabled === 'function') {
      return this.button.disabled(Utils.filterFieldsToObject(this.filterFields));
    }

    return false;
  }

  hidden(): boolean {
    if (typeof this.button.hidden === 'function') {
      return this.button.hidden(Utils.filterFieldsToObject(this.filterFields));
    }

    return false;
  }

  handle(): any {
    if (typeof this.button.handle === 'function') {
      return this.button.handle(Utils.filterFieldsToObject(this.filterFields));
    }
  }

}
