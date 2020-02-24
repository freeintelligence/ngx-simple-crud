import { Component, OnInit, Input } from '@angular/core';
import { FilterButton } from '../../interfaces/filter-button.interface';
import { FilterField } from '../../interfaces/filter-field.interface';

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
      return this.button.disabled(this.filterFieldsToObject());
    }

    return false;
  }

  hidden(): boolean {
    if (typeof this.button.hidden === 'function') {
      return this.button.hidden(this.filterFieldsToObject());
    }

    return false;
  }

  handle(): any {
    if (typeof this.button.handle === 'function') {
      return this.button.handle(this.filterFieldsToObject());
    }
  }

  filterFieldsToObject(): { [key: string]: FilterField } {
    const obj = {};

    if (this.filterFields instanceof Array) {
      this.filterFields.forEach(filter => obj[filter.key] = filter);
    }

    return obj;
  }

}
