import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [ResourceListComponent],
  exports: [ResourceListComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class SimpleCrudModule { }
