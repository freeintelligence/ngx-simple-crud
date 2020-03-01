import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Header } from '../../interfaces/header.interface';
import { InfoColumn } from '../../interfaces/info-column.interface';
import { Service } from '../../interfaces/service.interface';
import { DataTableComponent } from '../data-table/data-table.component';
import { Field, Button } from 'ngx-simple-forms';
import { Utils } from '../../utils';
import { FilterButton } from '../../interfaces/button.interface';

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  @Input('header') header: Header = {};
  @Input('filterFields') filterFields: Field[] = [];
  @Input('filterButtons') filterButtons: FilterButton[] = [];
  @Input('infoColumns') infoColumns: InfoColumn[] = [];
  @Input('displayedColumns') displayedColumns: string[] = [];
  @Input('itemButtons') itemButtons: Button[] = [];
  @Input('pageSize') pageSize: number = 10;
  @Input('pageSizeOptions') pageSizeOptions: number[] = [10, 20, 50, 100];
  @Input('service') service: Service = {};

  constructor() { }

  ngOnInit(): void {
  }

  filterFieldsToObject() {
    return Utils.filterFieldsToObject(this.filterFields);
  }

}
