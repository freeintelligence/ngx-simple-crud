import { Component, Input } from '@angular/core';
import { ManagerDeleteParameters } from './manager-delete.parameters';

@Component({
  selector: 'ngx-simple-crud-manager-delete',
  standalone: true,
  imports: [],
  templateUrl: './manager-delete.component.html',
  styleUrl: './manager-delete.component.css',
})
export class ManagerDeleteComponent {
  @Input({ required: true }) parameters!: ManagerDeleteParameters;
}
