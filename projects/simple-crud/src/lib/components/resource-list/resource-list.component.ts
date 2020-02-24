import { Component, OnInit, Input } from '@angular/core';
import { Header } from '../../interfaces/header.interface';
import { FilterField } from '../../interfaces/filter-field.interface';
import { FilterButton } from '../../interfaces/filter-button.interface';
import { InfoColumn } from '../../interfaces/info-column.interface';

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input('header') header: Header = {};
  @Input('filterFields') filterFields: FilterField[] = [];
  @Input('filterButtons') filterButtons: FilterButton[] = [];
  @Input('infoColumns') infoColumns: InfoColumn[] = [];
  @Input('displayedColumns') displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  async filter() {
  }

}
