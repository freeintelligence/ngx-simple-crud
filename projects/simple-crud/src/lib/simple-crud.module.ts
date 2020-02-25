import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { FilterFieldComponent } from './components/filter-field/filter-field.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ItemButtonComponent } from './components/item-button/item-button.component';

@NgModule({
  declarations: [ResourceListComponent, FilterFieldComponent, FilterButtonComponent, DataTableComponent, ItemButtonComponent],
  exports: [ResourceListComponent, FilterFieldComponent, FilterButtonComponent, DataTableComponent, ItemButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SimpleCrudModule { }
