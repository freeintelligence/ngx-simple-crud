import { Component, OnInit, Input } from '@angular/core';
import { FilterField } from '../../interfaces/filter-field.interface';

@Component({
  selector: 'simple-crud-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent implements OnInit {

  @Input('field') field: FilterField;

  constructor() { }

  ngOnInit(): void {
  }

  keyup(field: FilterField) {
    if (!field || typeof field.inputMask !== 'function') {
      return;
    }

    const val = field.inputMask(field);
    field.value = val;
  }

}