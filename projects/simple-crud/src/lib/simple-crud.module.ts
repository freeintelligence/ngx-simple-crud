import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ItemButtonComponent } from './components/item-button/item-button.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { SimpleFormsModule } from 'ngx-simple-forms';

@NgModule({
  declarations: [ResourceListComponent, FilterButtonComponent, DataTableComponent, ItemButtonComponent],
  exports: [ResourceListComponent, FilterButtonComponent, DataTableComponent, ItemButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ContentLoaderModule,
    SimpleFormsModule,
  ],
})
export class SimpleCrudModule { }
