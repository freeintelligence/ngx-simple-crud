import {
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {
  ManagerReadParameters,
  ManagerReadParametersServiceData,
} from './manager-read.parameters';
import { ManagerReadService } from './manager-read.service';
import { HttpClientModule } from '@angular/common/http';
import { getDeepValue } from '../../utils';
import { debounceTime } from 'rxjs';
import { FormComponent, FormElement } from 'ngx-simple-forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'ngx-simple-crud-manager-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormComponent,
    NgStyle,
  ],
  templateUrl: './manager-read.component.html',
  styleUrl: './manager-read.component.css',
})
export class ManagerReadComponent {
  public readonly DEFAULT_PAGE_SIZE = 10;
  public readonly DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
  public readonly DEFAULT_DEBOUNCE_TIME = 1000;

  @ViewChildren('elementsOnItem') elementsOnItem!: QueryList<FormComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() parameters!: ManagerReadParameters;

  public displayedColumns: string[] = [];
  public lastResult!: unknown;
  public clonedElementColumns: {
    [key: number]: { [key: string]: FormElement };
  } = {};

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly managerReadService: ManagerReadService
  ) {}

  ngAfterViewInit() {
    this.displayedColumnsListener();
    this.initFilters();
    this.refreshData();
  }

  private interceptButtonsOnItems() {
    this.changeDetectorRef.detectChanges();
    this.clonedElementColumns = {};

    const data = this.parameters.data || [];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];

      if (!item) {
        continue;
      }

      const formInstance = this.elementsOnItem.get(index);

      if (!formInstance) {
        continue;
      }

      for (const key in formInstance?.elements || {}) {
        const element = formInstance?.elements?.[key];

        if (!element) {
          continue;
        }

        if (element.type !== 'button') {
          continue;
        }

        const getExtraFn = element.params.getExtra;

        element.params.getExtra = () => {
          if (typeof getExtraFn === 'function') {
            getExtraFn();
          }

          return item;
        };
      }
    }
  }

  private displayedColumnsListener() {
    this.fnSetDisplayedColumns();
  }

  private fnSetDisplayedColumns() {
    this.displayedColumns = this.parameters.columns
      .filter((column) => !column.hidden)
      .map((column) => column.property);

    this.changeDetectorRef.detectChanges();
  }

  private initFilters() {
    this.parameters.filters = this.parameters.filters || {};
    this.parameters.filters.submitOn ??= 'change';

    this.initFiltersOnChange();
    this.initFiltersOnSubmit();
  }

  private initFiltersOnChange() {
    for (const key in this.parameters.filters?.elements ?? {}) {
      const element = this.parameters.filters?.elements?.[key];

      if (!element) {
        continue;
      }

      element.formControl?.valueChanges
        .pipe(
          debounceTime(
            this.parameters.filters?.debounceTime ?? this.DEFAULT_DEBOUNCE_TIME
          )
        )
        .subscribe(() => {
          if (this.parameters.filters?.submitOn !== 'change') {
            return;
          }

          this.refreshData();
        });
    }
  }

  private initFiltersOnSubmit() {
    for (const key in this.parameters.filters?.elements ?? {}) {
      const element = this.parameters.filters?.elements?.[key];

      if (!element) {
        continue;
      }

      if (!(element.type === 'button' && element.params.type === 'submit')) {
        continue;
      }

      const handleFn = element.params.handle;

      element.params.handle = async (form) => {
        if (typeof handleFn === 'function') {
          await handleFn(form);
        }

        if (this.parameters.filters?.submitOn !== 'submit') {
          return;
        }

        this.refreshData();
      };
    }
  }

  public async refreshData() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize ?? this.DEFAULT_PAGE_SIZE;
    const offset = pageIndex * pageSize;
    const filterValues = this.getFilterValues();
    const data: ManagerReadParametersServiceData = {
      offset,
      to: offset + pageSize,
      pageSize,
      pageNumber: pageIndex + 1,
      filters: {
        query: new URLSearchParams(
          filterValues as Record<string, string>
        ).toString(),
        json: filterValues,
      },
    };

    if (this.parameters.pagination?.remote || !this.lastResult) {
      this.lastResult = await this.managerReadService.get(
        this.parameters.service,
        data
      );
    }

    const allItems = getDeepValue<{ [key: string]: unknown }[]>(
      this.lastResult,
      this.parameters.service.keys?.results
    );

    let result: { [key: string]: unknown }[] = [];
    let toShow: { [key: string]: unknown }[] = [];

    if (this.parameters.pagination?.remote) {
      result = allItems || [];
      toShow = result || [];

      this.paginator.length =
        getDeepValue<number>(
          this.lastResult,
          this.parameters.service.keys?.count
        ) ?? 0;
    } else {
      result = this.filterItems(allItems || []);
      toShow = result?.slice(offset, offset + pageSize) || [];

      this.paginator.length = result?.length ?? 0;
    }

    this.parameters.data = toShow || [];

    this.interceptButtonsOnItems();
  }

  private getFilterValues() {
    const filters = this.parameters.filters?.elements;

    if (!filters) {
      return {};
    }

    const values: { [key: string]: unknown } = {};

    for (const key in filters) {
      const element = filters[key];

      if (!element) {
        continue;
      }

      const value = element.formControl?.value;

      if (typeof value === 'undefined' || value === null) {
        continue;
      }

      values[key] = element.formControl?.value;
    }

    return values;
  }

  private filterItems(items: { [key: string]: unknown }[]) {
    const filters = this.parameters.filters?.elements;

    if (!filters) {
      return items;
    }

    return items.filter((item) => {
      for (const key in filters) {
        const element = filters[key];

        if (
          !element?.formControl?.value ||
          element?.formControl?.value === null
        ) {
          continue;
        }

        switch (element.type) {
          case 'input': {
            if (
              item[key]
                ?.toString?.()
                ?.toLowerCase?.()
                ?.indexOf?.(element?.formControl?.value?.toLowerCase?.()) === -1
            ) {
              return false;
            }

            break;
          }
          case 'select': {
            if (item[key] !== element.formControl?.value) {
              return false;
            }

            break;
          }
        }
      }

      return true;
    });
  }
}
