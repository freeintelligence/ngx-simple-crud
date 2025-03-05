import { Component, Input, ViewChild } from '@angular/core';
import { ManagerFiltersParameters } from './manager-filters.parameters';
import { FormComponent } from 'ngx-simple-forms';

@Component({
  selector: 'ngx-simple-crud-manager-filters',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './manager-filters.component.html',
  styleUrl: './manager-filters.component.css',
})
export class ManagerFiltersComponent {
  @Input({ required: true }) parameters!: ManagerFiltersParameters;
}
