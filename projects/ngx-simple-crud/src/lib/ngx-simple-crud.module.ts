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
  MatDialogModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogEditElementComponent } from './dialog-edit-element/dialog-edit-element.component';

@NgModule({
  declarations: [ResourceListComponent, DialogEditElementComponent],
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
    MatDialogModule,
  ],
  exports: [ResourceListComponent],
  entryComponents: [DialogEditElementComponent],
})
export class NgxSimpleCrudModule { }
