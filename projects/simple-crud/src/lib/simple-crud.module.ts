import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { SimpleFormsModule } from 'ngx-simple-forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ResourceListComponent, DataTableComponent],
  exports: [ResourceListComponent, DataTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ContentLoaderModule,
    SimpleFormsModule,
  ],
})
export class SimpleCrudModule { }
