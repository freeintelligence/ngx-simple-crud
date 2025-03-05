import { Component, Input } from '@angular/core';
import { ManagerHeaderComponent } from '../manager-header/manager-header.component';
import { ManagerFiltersComponent } from '../manager-filters/manager-filters.component';
import { ManagerHeaderParameters } from '../manager-header/manager-header.parameters';
import { ManagerFiltersParameters } from '../manager-filters/manager-filters.parameters';
import { ManagerReadComponent } from '../manager-read/manager-read.component';
import { ManagerReadParameters } from '../manager-read/manager-read.parameters';

@Component({
  selector: 'ngx-simple-crud-manager',
  standalone: true,
  imports: [
    ManagerHeaderComponent,
    ManagerFiltersComponent,
    ManagerReadComponent,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @Input() header!: ManagerHeaderParameters;
  @Input() filters!: ManagerFiltersParameters;
  @Input() read!: ManagerReadParameters;
}
