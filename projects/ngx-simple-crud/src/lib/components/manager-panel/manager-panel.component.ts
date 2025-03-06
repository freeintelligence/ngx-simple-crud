import { Component, Input } from '@angular/core';
import { ManagerPanelParameters } from './manager-panel.parameters';
import { FormComponent } from 'ngx-simple-forms';

@Component({
  selector: 'ngx-simple-crud-manager-panel',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './manager-panel.component.html',
  styleUrl: './manager-panel.component.css',
})
export class ManagerPanelComponent {
  @Input({ required: true }) parameters!: ManagerPanelParameters;
}
