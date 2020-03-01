import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Service } from '../../interfaces/service.interface';
import { Utils } from '../../utils';
import { Paginator } from '../../interfaces/paginator.interface';
import { MatPaginator } from '@angular/material/paginator';
import { InfoColumn } from '../../interfaces/info-column.interface';
import { ItemButton } from '../../interfaces/button.interface';
import { FilterField } from '../../interfaces/field.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'simple-crud-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;

  @Input('service') service: Service;
  @Input('filterFields') filterFields: FilterField[];
  @Input('infoColumns') infoColumns: InfoColumn[];
  @Input('displayedColumns') displayedColumns: string[];
  @Input('itemButtons') itemButtons: ItemButton[];
  @Input('pageSize') pageSize: number;
  @Input('pageSizeOptions') pageSizeOptions: number[];

  paginator: Paginator;
  loading: boolean;
  error: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.filter();
  }

  async filter(pageIndex: number = 1) {
    if (typeof this.service !== 'object' || this.service === null || typeof this.service.list !== 'object' || this.service.list === null) {
      return false;
    }

    this.loading = true;
    this.error = undefined;

    if (this.paginator) {
      this.paginator.data = [];
    }

    try {
      if (typeof this.service.list.handle === 'function') {
        this.paginator = await this.service.list.handle(pageIndex, this.matPaginator.pageSize || this.pageSize, Utils.filterFieldsToObject(this.filterFields));
      } else if (typeof this.service.list.url === 'string') {
        switch (typeof this.service.list.method === 'string' && this.service.list.method.length ? this.service.list.method.toUpperCase() : 'GET') {
          case 'GET': {
            this.paginator = await this.http.get(this.service.list.url, { params: Utils.filterFieldsToValues(this.filterFields) }).toPromise() as any;
            break;
          }
          case 'PATCH': {
            this.paginator = await this.http.patch(this.service.list.url, Utils.filterFieldsToValues(this.filterFields)).toPromise() as any;
            break;
          }
          case 'PUT': {
            this.paginator = await this.http.put(this.service.list.url, Utils.filterFieldsToValues(this.filterFields)).toPromise() as any;
            break;
          }
          case 'DELETE': {
            this.paginator = await this.http.delete(this.service.list.url, { params: Utils.filterFieldsToValues(this.filterFields) }).toPromise() as any;
            break;
          }
          case 'POST':
          default: {
            this.paginator = await this.http.post(this.service.list.url, Utils.filterFieldsToValues(this.filterFields)).toPromise() as any;
            break;
          }
        }
      }
    } catch (err) {
      this.error = err;
    }

    this.loading = false;
  }

  print(column: InfoColumn, element: any) {
    return column.method && typeof element[column.method] === 'function' ? element[column.method](element) : element[column.property];
  }

}
