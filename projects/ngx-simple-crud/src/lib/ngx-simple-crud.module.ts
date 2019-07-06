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
import { DialogRemoveElementComponent } from './dialog-remove-element/dialog-remove-element.component';

@NgModule({
  declarations: [ResourceListComponent, DialogEditElementComponent, DialogRemoveElementComponent],
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
  entryComponents: [DialogEditElementComponent, DialogRemoveElementComponent],
})
export class NgxSimpleCrudModule { }
