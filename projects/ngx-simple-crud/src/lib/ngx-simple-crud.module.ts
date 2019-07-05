import { NgModule } from '@angular/core';
import { ResourceListComponent } from './resource-list/resource-list.component';
import {
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatPaginatorModule,
  MatChipsModule,
  MatDatepickerModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ResourceListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [ResourceListComponent]
})
export class NgxSimpleCrudModule { }
