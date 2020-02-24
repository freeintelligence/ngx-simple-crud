import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResourceListComponent],
  exports: [ResourceListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SimpleCrudModule { }
