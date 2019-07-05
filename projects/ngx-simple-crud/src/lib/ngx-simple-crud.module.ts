import { NgModule } from '@angular/core';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResourceListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [ResourceListComponent]
})
export class NgxSimpleCrudModule { }
