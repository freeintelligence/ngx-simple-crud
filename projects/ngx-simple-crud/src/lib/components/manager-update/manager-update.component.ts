import { Component, Input } from '@angular/core';
import { ManagerUpdateParameters } from './manager-update.parameters';
import { ManagerCreateComponent } from '../manager-create/manager-create.component';
import { deepClone, deepMerge } from '../../utils';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-simple-crud-manager-update',
  standalone: true,
  imports: [],
  templateUrl: './manager-update.component.html',
  styleUrl: './manager-update.component.css',
})
export class ManagerUpdateComponent extends ManagerCreateComponent {
  public override readonly DEFAULT_METHOD = 'PATCH';
  public override readonly DEFAULT_SUCCESS_WHEN_FN = (
    response: HttpResponse<Object>
  ) => response.status === 200;

  @Input({ required: true }) override parameters!: ManagerUpdateParameters;

  override ngAfterViewInit(): void {
    this.cloneFromBase();

    super.ngAfterViewInit();
  }

  private cloneFromBase() {
    const base = this.parameters.base;

    if (!base && typeof this.parameters.base !== 'object') {
      return;
    }

    this.parameters = deepMerge<ManagerUpdateParameters>(
      base as ManagerUpdateParameters,
      { ...this.parameters, base: undefined }
    );
  }
}
