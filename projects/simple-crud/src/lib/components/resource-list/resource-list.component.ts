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

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  @Input('header') header: Header = {};
  @Input('filterFields') filterFields: FilterField[] = [];
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
    ((typeof this.service.list.url === 'string' && Boolean(this.service.list.url.length)) || typeof this.service.list.handle === 'function');
  }

  hasCreate(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.create === 'object' && this.service.create !== null &&
    ((typeof this.service.create.url === 'string' && Boolean(this.service.create.url.length)) || typeof this.service.create.handle === 'function');
  }

  hasRead(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.read === 'object' && this.service.read !== null &&
    ((typeof this.service.read.url === 'string' && Boolean(this.service.read.url.length)) || typeof this.service.read.handle === 'function');
  }

  hasUpdate(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.update === 'object' && this.service.update !== null &&
    ((typeof this.service.update.url === 'string' && Boolean(this.service.update.url.length)) || typeof this.service.update.handle === 'function');
  }

  hasDelete(): boolean {
    return typeof this.service === 'object' && this.service !== null &&
    typeof this.service.delete === 'object' && this.service.delete !== null &&
    ((typeof this.service.delete.url === 'string' && Boolean(this.service.delete.url.length)) || typeof this.service.delete.handle === 'function');
  }

  openCreate() { 
    const dialog = this.simpleFormsService.createDialogForm({
      header: {
        title: this.hasCreate() && this.service.create.title ? this.service.create.title : 'Crear recurso',
        color: this.hasCreate() && this.service.create.color ? this.service.create.color : 'primary',
      },
      message: this.hasCreate() && this.service.create.description ? this.service.create.description : 'Rellena todos los <strong>campos requeridos</strong> antes de enviar el formulario!',
      fields: this.controls,
      buttons: [
        {
          text: 'Cerrar',
          icon: 'close',
          iconLeft: true,
          type: 'button',
          handle: () => dialog.close()
        },
        {
          color: 'primary',
          text: 'Guardar',
          icon: 'save',
          handle: this.hasCreate() && typeof this.service.create.handle === 'function' ? async (form: FormGroup) => {
            return await this.service.create.handle(form);
          } : null,
        },
      ],
      submit: {
        url: this.hasCreate() && this.service.create.url ? this.service.create.url : null,
        method: this.hasCreate() && this.service.create.method ? this.service.create.method : null,
        success: {
          message: this.hasCreate() && this.service.create.successMessage ? this.service.create.successMessage : 'Recurso guardado exitosamente!',
          buttons: [
            { text: 'Cerrar', color: 'primary', style: 'stroked', type: 'button', handle: () => dialog.close() },
          ],
          handle: () => this.dataTable.filter(),
        },
        error: {
          message: this.hasCreate() && this.service.create.errorMessage ? this.service.create.errorMessage : 'Tenemos problemas para conectarnos a nuestros servidores. Intenta luego!'
        },
      }
    });
  }

  filterFieldsToObject() {
    return Utils.filterFieldsToObject(this.filterFields);
  }

}
