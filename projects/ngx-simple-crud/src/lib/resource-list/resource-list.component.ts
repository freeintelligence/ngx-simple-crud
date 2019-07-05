import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { Paginator } from './../paginator';

export interface FilterEvent {
  pageIndex: number;
  pageSize: number;
  filters: any;
}

export interface FilterForm {
  name: string;
  type: 'select'|'input'|'date';
  subtype?: 'text'|'number';
  placeholder?: string;
  options?: { value: any, description: string }[];
  value?: any;
  width?: string;
}

export interface ColumnInfo {
  key: string;
  subkey?: string;
  title: string;
}

export interface ActionButton {
  color?: 'primary'|'warn'|'accent';
  toolTip: string;
  icon: string;
  handle?: (element: any) => void;
}

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() headerTitle: string;
  @Input() loading: boolean;
  @Input() error: Error;
  @Input() pageSize = 10;
  @Input() filters: FilterForm[] = [];
  @Input() infoColumns: ColumnInfo[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() filter: (options: FilterEvent) => Promise<Paginator>;
  @Input() buttons: ActionButton[] = [];

  dataSource: Paginator;

  filtersFormGroup: FormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit() {
    this.createFormControls();

    this.search();
  }

  createFormControls() {
    this.filters.forEach(filter => {
      this.filtersFormGroup.addControl(filter.name, new FormControl(filter.value));
    });
  }

  handle(element: any, button: ActionButton) {
    if (button && typeof button.handle === 'function') {
      button.handle(element);
    }
  }

  async search(pageIndex: number = 1) {
    this.loading = true;
    this.error = undefined;

    if (this.dataSource) {
      this.dataSource.data = [];
    }

    try {
      this.dataSource = await this.filter({ pageIndex, pageSize: this.paginator.pageSize || this.pageSize, filters: this.filtersFormGroup.value });
    } catch (err) {
      this.error = err;
    }

    this.loading = false;
  }

  print(column: any, element: any) {
    return column.subkey ?
    (element[column.key] && element[column.key][column.subkey] ? element[column.key][column.subkey] : '') :
    (element[column.key] instanceof Function ? element[column.key]() : element[column.key]);
  }

}
