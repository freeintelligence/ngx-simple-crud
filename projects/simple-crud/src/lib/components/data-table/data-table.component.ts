import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Service } from '../../interfaces/service.interface';
import { FilterField } from '../../interfaces/filter-field.interface';
import { Utils } from '../../utils';
import { Paginator } from '../../interfaces/paginator.interface';
import { MatPaginator } from '@angular/material/paginator';
import { InfoColumn } from '../../interfaces/info-column.interface';

@Component({
  selector: 'simple-crud-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;

  @Input('service') service: Service;
  @Input('filterFields') filterFields: FilterField[];
  @Input('infoColumns') infoColumns: InfoColumn[];
  @Input('displayedColumns') displayedColumns: string[];
  @Input('pageSize') pageSize: number;
  @Input('pageSizeOptions') pageSizeOptions: number[];

  paginator: Paginator;
  loading: boolean;
  error: any;

  constructor() { }

  ngOnInit(): void {
    this.filter();
  }

  async filter(pageIndex: number = 1) {
    if (typeof this.service !== 'object' || typeof this.service.filter !== 'function') {
      return false;
    }

    this.loading = true;
    this.error = undefined;

    if (this.paginator) {
      this.paginator.data = [];
    }

    try {
      this.paginator = await this.service.filter({
        pageIndex,
        pageSize: this.matPaginator.pageSize || this.pageSize,
        filterFields: Utils.filterFieldsToObject(this.filterFields),
      });
    } catch (err) {
      this.error = err;
    }

    this.loading = false;
  }

  print(column: InfoColumn, element: any) {
    return column.method && typeof element[column.method] === 'function' ? element[column.method](element) : element[column.property];
  }

}
