import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

}
