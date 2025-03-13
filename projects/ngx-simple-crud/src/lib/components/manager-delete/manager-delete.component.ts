import { Component, Input } from '@angular/core';
import { ManagerDeleteParameters } from './manager-delete.parameters';
import { HttpResponse } from '@angular/common/http';
import { ManagerUpdateComponent } from '../manager-update/manager-update.component';

@Component({
  selector: 'ngx-simple-crud-manager-delete',
  standalone: true,
  imports: [],
  templateUrl: './manager-delete.component.html',
  styleUrl: './manager-delete.component.css',
})
export class ManagerDeleteComponent extends ManagerUpdateComponent {
  public override readonly DEFAULT_METHOD:
    | 'GET'
    | 'POST'
    | 'PATCH'
    | 'PUT'
    | 'DELETE' = 'DELETE';
  public override readonly DEFAULT_SUCCESS_WHEN_FN = (
    response: HttpResponse<Object>
  ) => response.status === 204;

  @Input({ required: true }) override parameters!: ManagerDeleteParameters;

  override ngAfterViewInit(): void {
    this.cloneFromBase();

    super.ngAfterViewInit();
  }

  protected override getAllElements() {
    return { ...this.parameters.buttons };
  }
}
