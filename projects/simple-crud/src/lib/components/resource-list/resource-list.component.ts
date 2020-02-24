import { Component, OnInit, Input } from '@angular/core';
import { Header } from '../../interfaces/header.interface';
import { FilterField } from '../../interfaces/filter-field.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input('header') header: Header = {};
  
  public filtersFormGroup: FormGroup = new FormGroup({});
  @Input('filters') filters: FilterField[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setFiltersFormGroup();
  }

  setFiltersFormGroup() {
    this.filtersFormGroup = new FormGroup({});
    this.filters.forEach(filter => this.filtersFormGroup.addControl(filter.key, new FormControl(filter.value)));
  }

  async filter() {

  }

  inputMask(field: any, event: any) {

  }

}
