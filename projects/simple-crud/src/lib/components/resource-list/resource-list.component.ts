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
  @Input('filters') filters: FilterField[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  async filter() {
    console.log('filters', this.filters);
  }

  inputMask(field: any, event: any) {

  }

}
