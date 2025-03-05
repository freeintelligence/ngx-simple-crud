import { Component, Input, ViewChild } from '@angular/core';
import { ManagerHeaderComponent } from '../manager-header/manager-header.component';
import { ManagerPanelComponent } from '../manager-panel/manager-panel.component';
import { ManagerHeaderParameters } from '../manager-header/manager-header.parameters';
import { ManagerPanelParameters } from '../manager-panel/manager-panel.parameters';
import { ManagerReadComponent } from '../manager-read/manager-read.component';
import { ManagerReadParameters } from '../manager-read/manager-read.parameters';
import { ManagerCreateComponent } from '../manager-create/manager-create.component';
import { ManagerCreateParameters } from '../manager-create/manager-create.parameters';
import { ManagerUpdateComponent } from '../manager-update/manager-update.component';
import { ManagerDeleteComponent } from '../manager-delete/manager-delete.component';
import { ManagerDeleteParameters } from '../manager-delete/manager-delete.parameters';
import { ManagerUpdateParameters } from '../manager-update/manager-update.parameters';

@Component({
  selector: 'ngx-simple-crud-manager',
  standalone: true,
  imports: [
    ManagerHeaderComponent,
    ManagerPanelComponent,
    ManagerReadComponent,
    ManagerCreateComponent,
    ManagerUpdateComponent,
    ManagerDeleteComponent,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export class ManagerComponent {
  @ViewChild(ManagerHeaderComponent) headerComponent!: ManagerHeaderComponent;
  @ViewChild(ManagerPanelComponent) panelComponent!: ManagerPanelComponent;
  @ViewChild(ManagerCreateComponent) createComponent!: ManagerCreateComponent;
  @ViewChild(ManagerReadComponent) readComponent!: ManagerReadComponent;
  @ViewChild(ManagerUpdateComponent) updateComponent!: ManagerUpdateComponent;
  @ViewChild(ManagerDeleteComponent) deleteComponent!: ManagerDeleteComponent;

  @Input() headerParameters!: ManagerHeaderParameters;
  @Input() panelParameters!: ManagerPanelParameters;
  @Input() createParameters!: ManagerCreateParameters;
  @Input() readParameters!: ManagerReadParameters;
  @Input() updateParameters!: ManagerUpdateParameters;
  @Input() deleteParameters!: ManagerDeleteParameters;
}
