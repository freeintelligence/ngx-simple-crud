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
  ManagerReadParametersColumn,
  ManagerReadParametersServiceData,
} from './manager-read.parameters';
import { ManagerReadService } from './manager-read.service';
import { HttpClientModule } from '@angular/common/http';
import { getDeepValue } from '../../utils';
import { debounceTime } from 'rxjs';
import { FormComponent, FormElement } from 'ngx-simple-forms';
import { NgIf, NgStyle } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ngx-simple-crud-manager-read',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormComponent,
    NgStyle,
    NgIf,
    MatProgressSpinnerModule,
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

  public loading?: boolean = true;
  public error?: Error;
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

        const getOnExtraFn = element.getOnExtra;

        element.getOnExtra = () => {
          let data = {};

          if (typeof getOnExtraFn === 'function') {
            data = getOnExtraFn();
          }

          return { ...data, item, elements: formInstance.elements };
        };

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

  public async refreshData(forceFetch: boolean = false) {
    this.loading = true;
    this.error = undefined;
    this.parameters.data = [];

    try {
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

      if (
        this.parameters.pagination?.remote ||
        !this.lastResult ||
        forceFetch
      ) {
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
    } catch (err) {
      console.log('err', err);
      const error: Error = err as Error;

      this.error = error;
    }

    this.loading = false;

    this.changeDetectorRef.markForCheck();
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

    const result = items.filter((item) => {
      for (const key in filters) {
        const element = filters[key];

        if (
          !element?.formControl?.value ||
          element?.formControl?.value === null
        ) {
          continue;
        }

        const value = getDeepValue<string | number | undefined | null>(
          item,
          key
        );

        if (typeof value === 'undefined' || value === '' || value === null) {
          return false;
        }

        switch (element.type) {
          case 'input': {
            if (
              value
                ?.toString?.()
                ?.toLowerCase?.()
                ?.indexOf?.(element?.formControl?.value?.toLowerCase?.()) === -1
            ) {
              return false;
            }

            continue;
          }
          case 'select':
          case 'remote-select': {
            if (value !== element.formControl?.value) {
              return false;
            }

            continue;
          }
        }
      }

      return true;
    });

    return result;
  }

  public mutate(value: unknown, column: ManagerReadParametersColumn) {
    if (!column.mutate) {
      return value;
    }

    return column.mutate(value);
  }
}
