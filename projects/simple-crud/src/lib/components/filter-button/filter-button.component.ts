import { Component, OnInit, Input } from '@angular/core';
import { FilterButton } from '../../interfaces/filter-button.interface';

@Component({
  selector: 'simple-crud-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css']
})
export class FilterButtonComponent implements OnInit {

  @Input('button') button: FilterButton;

  constructor() { }

  ngOnInit(): void {
  }

}
