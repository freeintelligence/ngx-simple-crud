import { Component, Input, ViewChild } from '@angular/core';
import { ManagerHeaderComponent } from '../manager-header/manager-header.component';
import { ManagerPanelComponent } from '../manager-panel/manager-panel.component';
import { ManagerHeaderParameters } from '../manager-header/manager-header.parameters';
import { ManagerPanelParameters } from '../manager-panel/manager-panel.parameters';
import { ManagerReadComponent } from '../manager-read/manager-read.component';
import { ManagerReadParameters } from '../manager-read/manager-read.parameters';
import { ManagerCreateComponent } from '../manager-create/manager-create.component';
import { ManagerCreateParameters } from '../manager-create/manager-create.parameters';

@Component({
  selector: 'ngx-simple-crud-manager',
  standalone: true,
  imports: [
    ManagerHeaderComponent,
    ManagerPanelComponent,
    ManagerReadComponent,
    ManagerCreateComponent,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @ViewChild(ManagerHeaderComponent) headerComponent!: ManagerHeaderComponent;
  @ViewChild(ManagerPanelComponent) panelComponent!: ManagerPanelComponent;
  @ViewChild(ManagerReadComponent) readComponent!: ManagerReadComponent;
  @ViewChild(ManagerCreateComponent) createComponent!: ManagerCreateComponent;

  @Input() headerParameters!: ManagerHeaderParameters;
  @Input() panelParameters!: ManagerPanelParameters;
  @Input() readParameters!: ManagerReadParameters;
  @Input() createParameters!: ManagerCreateParameters;
}
