import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormComponent } from 'ngx-simple-forms';
import { ManagerHeaderParameters } from './manager-header.parameters';

@Component({
  selector: 'ngx-simple-crud-manager-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, FormComponent],
  templateUrl: './manager-header.component.html',
  styleUrl: './manager-header.component.css',
})
export class ManagerHeaderComponent {
  @Input({ required: true }) parameters: ManagerHeaderParameters = {
    title: 'Lista',
  };
}
