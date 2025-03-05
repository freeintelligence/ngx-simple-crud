import { Component, Input, ViewChild } from '@angular/core';
import { ManagerHeaderComponent } from '../manager-header/manager-header.component';
import { ManagerPanelComponent } from '../manager-panel/manager-panel.component';
import { ManagerHeaderParameters } from '../manager-header/manager-header.parameters';
import { ManagerPanelParameters } from '../manager-panel/manager-panel.parameters';
import { ManagerReadComponent } from '../manager-read/manager-read.component';
import { ManagerReadParameters } from '../manager-read/manager-read.parameters';

@Component({
  selector: 'ngx-simple-crud-manager',
  standalone: true,
  imports: [
    ManagerHeaderComponent,
    ManagerPanelComponent,
    ManagerReadComponent,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @ViewChild(ManagerHeaderComponent) managerHeader!: ManagerHeaderComponent;
  @ViewChild(ManagerPanelComponent) ManagerPanel!: ManagerPanelComponent;
  @ViewChild(ManagerReadComponent) managerRead!: ManagerReadComponent;

  @Input() header!: ManagerHeaderParameters;
  @Input() panel!: ManagerPanelParameters;
  @Input() read!: ManagerReadParameters;
}
