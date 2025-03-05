import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  ManagerReadParameters,
  ManagerReadParametersServiceData,
} from './manager-read.parameters';
import { ManagerReadService } from './manager-read.service';
import { HttpClientModule } from '@angular/common/http';
import { getDeepValue } from '../../utils';

@Component({
  selector: 'ngx-simple-crud-manager-read',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, HttpClientModule],
  templateUrl: './manager-read.component.html',
  styleUrl: './manager-read.component.css',
})
export class ManagerReadComponent {
  public readonly DEFAULT_PAGE_SIZE = 10;
  public readonly DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() parameters!: ManagerReadParameters;

  public displayedColumns: string[] = [];
  public lastResult!: unknown;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private managerReadService: ManagerReadService
  ) {}

  ngAfterViewInit() {
    this.initPaginator();
    this.displayedColumnsListener();
    this.refreshData();
  }

  initPaginator() {
    if (this.parameters.pagination?.remote) {
      return this.initRemotePaginator();
    } else {
      return this.initLocalPaginator();
    }
  }

  initRemotePaginator() {}

  initLocalPaginator() {}

  private displayedColumnsListener() {
    this.fnSetDisplayedColumns();
  }

  private fnSetDisplayedColumns() {
    this.displayedColumns = this.parameters.columns
      .filter((column) => !column.hidden)
      .map((column) => column.property);

    this.changeDetectorRef.detectChanges();
  }

  public async refreshData() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize ?? this.DEFAULT_PAGE_SIZE;
    const offset = pageIndex * pageSize;
    const data: ManagerReadParametersServiceData = {
      offset,
      to: offset + pageSize,
      pageSize,
      pageNumber: pageIndex + 1,
    };

    if (this.parameters.pagination?.remote || !this.lastResult) {
      this.lastResult = await this.managerReadService.get(
        this.parameters.service,
        data
      );
    }

    const result = getDeepValue<unknown[]>(
      this.lastResult,
      this.parameters.service.keys?.results
    );

    let toShow: unknown[] = [];

    if (this.parameters.pagination?.remote) {
      toShow = result || [];

      this.paginator.length =
        getDeepValue<number>(
          this.lastResult,
          this.parameters.service.keys?.count
        ) ?? 0;
    } else {
      toShow = result?.slice(offset, offset + pageSize) || [];

      this.paginator.length = result?.length ?? 0;
    }

    this.parameters.data = toShow || [];
  }
}
