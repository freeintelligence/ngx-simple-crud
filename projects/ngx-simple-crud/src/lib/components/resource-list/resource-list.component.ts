import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Header } from '../../interfaces/header.interface';
import { InfoColumn } from '../../interfaces/info-column.interface';
import { Service } from '../../interfaces/service.interface';
import { DataTableComponent } from '../data-table/data-table.component';
import { Utils } from '../../utils';
import { FilterButton, ItemButton } from '../../interfaces/button.interface';
import { FilterField } from '../../interfaces/field.interface';
import { Field, SimpleFormsService } from 'ngx-simple-forms';
import { FormGroup } from '@angular/forms';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) dataTable!: DataTableComponent;

  @Input('header') header: Header = {};
  @Input('filterFields') filterFields: FilterField[] | { [key: string]: FilterField } = [];
  @Input('filterButtons') filterButtons: FilterButton[] = [];
  @Input('infoColumns') infoColumns: InfoColumn[] = [];
  @Input('displayedColumns') displayedColumns: string[] = [];
  @Input('itemButtons') itemButtons: ItemButton[] = [];
  @Input('pageSize') pageSize: number = 10;
  @Input('pageSizeOptions') pageSizeOptions: number[] = [10, 20, 50, 100];
  @Input('controls') controls: Field[] | { [key: string]: Field } = [];
  @Input('service') service: Service = {};

  constructor(private simpleFormsService: SimpleFormsService) { }

  ngOnInit(): void {
  }

  hasList(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.list === 'object' && this.service.list !== null &&
    (
      (
        (typeof this.service.list.url === 'string' && Boolean((this.service.list.url as string).length)) ||
        (typeof this.service.list.url === 'function' && Boolean(this.service.list.url()))
      ) ||
      typeof this.service.list.handle === 'function'
    );
  }

  hasCreate(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.create === 'object' && this.service.create !== null &&
    (
      (
        (typeof this.service.create.url === 'string' && Boolean((this.service.create.url as string).length)) ||
        (typeof this.service.create.url === 'function' && Boolean(this.service.create.url()))
      ) ||
      typeof this.service.create.handle === 'function'
    );
  }

  hasUpdate(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.update === 'object' && this.service.update !== null &&
    (
      (
        (typeof this.service.update.url === 'string' && Boolean((this.service.update.url as string).length)) ||
        (typeof this.service.update.url === 'function' && Boolean(this.service.update.url({})))
      ) ||
      typeof this.service.update.handle === 'function'
    );
  }

  hasDelete(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.delete === 'object' && this.service.delete !== null &&
    (
      (
        (typeof this.service.delete.url === 'string' && Boolean((this.service.delete.url as string).length)) ||
        (typeof this.service.delete.url === 'function' && Boolean(this.service.delete.url({})))
      ) ||
      typeof this.service.delete.handle === 'function'
    );
  }

  openCreate() {
    const dialog = this.simpleFormsService.createDialogForm({
      header: {
        title: this.hasCreate() && this.service.create?.title ? this.service.create.title : 'Crear recurso',
        color: this.hasCreate() && this.service.create?.color ? this.service.create.color : 'primary',
      },
      message: this.hasCreate() && this.service.create?.description ? this.service.create.description : 'Rellena todos los <strong>campos requeridos</strong> antes de enviar el formulario!',
      fields: this.controls,
      fieldHiddenParams: [ 'create' ],
      buttons: [
        {
          text: 'Cerrar',
          icon: 'close',
          iconLeft: true,
          type: 'button',
          handle: () => dialog.close(),
          tooltip: '',
        },
        {
          color: 'primary',
          text: 'Guardar',
          icon: 'save',
          handle: this.hasCreate() && typeof this.service.create?.handle === 'function' ? async (form: FormGroup) => {
            return this.service.create?.handle ? await this.service.create.handle(form) : null;
          } : () => null,
          tooltip: '',
        },
      ],
      submit: {
        url: (
          this.hasCreate() && typeof this.service.create?.url === 'string' ? this.service.create.url :
          this.hasCreate() && typeof this.service.create?.url === 'function' ? this.service.create.url() : null as any
        ),
        method: this.hasCreate() && this.service.create?.method ? this.service.create.method : null as any,
        success: {
          message: this.hasCreate() && this.service.create?.successMessage ? this.service.create.successMessage : 'Recurso guardado exitosamente!',
          buttons: [
            { text: 'Cerrar', color: 'primary', style: 'stroked', type: 'button', handle: () => dialog.close(), tooltip: '' },
          ],
          handle: () => this.dataTable.filter(),
        },
        error: {
          message: this.hasCreate() && this.service.create?.errorMessage ? this.service.create.errorMessage : 'Tenemos problemas para conectarnos a nuestros servidores. Intenta luego!'
        },
      }
    });
  }

  openUpdate(element: any) {
    const dialog = this.simpleFormsService.createDialogForm({
      header: {
        title: this.hasUpdate() && this.service.update?.title ? this.service.update.title : 'Actualizar recurso',
        color: this.hasUpdate() && this.service.update?.color ? this.service.update.color : 'primary',
      },
      message: this.hasUpdate() && this.service.update?.description ? this.service.update.description : 'Rellena todos los <strong>campos requeridos</strong> antes de enviar el formulario!',
      fields: this.controls,
      fieldHiddenParams: [ 'update', element ],
      model: element,
      buttons: [
        {
          text: 'Cerrar',
          icon: 'close',
          iconLeft: true,
          type: 'button',
          handle: () => dialog.close(),
          tooltip: '',
        },
        {
          color: 'primary',
          text: 'Actualizar',
          icon: 'save',
          handle: this.hasUpdate() && typeof this.service.update?.handle === 'function' ? async (form: FormGroup) => {
            return this.service.update?.handle ? await this.service.update.handle(element, form) : null;
          } : () => null,
          tooltip: '',
        },
      ],
      submit: {
        url: (
          this.hasUpdate() && typeof this.service.update?.url === 'string' ? this.service.update.url :
          this.hasUpdate() && typeof this.service.update?.url === 'function' ? this.service.update.url(element) : null as any
        ),
        method: this.hasUpdate() && this.service.update?.method ? this.service.update.method : null as any,
        success: {
          message: this.hasUpdate() && this.service.update?.successMessage ? this.service.update.successMessage : 'Recurso actualizado exitosamente!',
          buttons: [
            { text: 'Cerrar', color: 'primary', style: 'stroked', type: 'button', handle: () => dialog.close(), tooltip: '' },
          ],
          handle: () => this.dataTable.filter(),
        },
        error: {
          message: this.hasUpdate() && this.service.update?.errorMessage ? this.service.update.errorMessage : 'Tenemos problemas para conectarnos a nuestros servidores. Intenta luego!'
        },
      }
    });
  }

  openDelete(element: any) {
    const dialog = this.simpleFormsService.createDialogForm({
      header: {
        title: this.hasDelete() && this.service.delete?.title ? this.service.delete.title : 'Eliminar recurso',
        color: this.hasDelete() && this.service.delete?.color ? this.service.delete.color : 'primary',
      },
      message: this.hasDelete() && this.service.delete?.description ? this.service.delete.description : '¿Estás seguro/a de <strong>eliminar</strong> el recurso seleccionado? <strong>Esta acción no se puede deshacer.</strong>',
      fields: [],
      fieldHiddenParams: [ 'delete', element ],
      buttons: [
        {
          text: 'Cerrar',
          icon: 'close',
          iconLeft: true,
          type: 'button',
          handle: () => dialog.close(),
          tooltip: '',
        },
        {
          color: 'warn',
          text: 'Confirmar eliminación',
          icon: 'delete',
          handle: this.hasDelete() && typeof this.service.delete?.handle === 'function' ? async (form: FormGroup) => {
            return this.service.delete?.handle ? await this.service.delete.handle(element) : null;
          } : () => null,
          tooltip: '',
        },
      ],
      submit: {
        url: (
          this.hasDelete() && typeof this.service.delete?.url === 'string' ? this.service.delete.url :
          this.hasDelete() && typeof this.service.delete?.url === 'function' ? this.service.delete.url(element) : null as any
        ),
        method: this.hasDelete() && this.service.delete?.method ? this.service.delete.method : null as any,
        success: {
          message: this.hasDelete() && this.service.delete?.successMessage ? this.service.delete.successMessage : 'Recurso eliminado exitosamente!',
          buttons: [
            { text: 'Cerrar', color: 'warn', style: 'stroked', type: 'button', handle: () => dialog.close(), tooltip: '', },
          ],
          handle: () => this.dataTable.filter(),
        },
        error: {
          message: this.hasDelete() && this.service.delete?.errorMessage ? this.service.delete.errorMessage : 'Tenemos problemas para conectarnos a nuestros servidores. Intenta luego!'
        },
      }
    });
  }

  filterFieldsToObject() {
    return Utils.filterFieldsToObject(this.filterFields);
  }

  filterFieldsToArray() {
    return Utils.filterFieldsToArray(this.filterFields);
  }

  originalOrder(a: any, b: any): number {
    return 0;
  }

}
