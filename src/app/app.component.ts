import { Component, ViewChild } from '@angular/core';
import {
  Header,
  InfoColumn,
  Service,
  FilterButton,
  FilterField,
  ItemButton,
  ResourceListComponent,
} from 'ngx-simple-crud';
import { Field } from 'ngx-simple-forms';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';

type ModelElement = any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('resourceList', { static: true })
  resourceList!: ResourceListComponent;

  headerTitle = 'Lista de organizaciones';
  pageTitle = 'Organizaciones';
  createTitle = 'Crear Organización';
  createMessage = 'Organización creada exitosamente!';
  editTitle = 'Actualizar Organización';
  editMessage = 'Organización actualizada exitosamente!';
  deleteTitle = 'Eliminar Organización';
  deleteMessage = 'Organización eliminada exitosamente!';
  deleteDescription =
    '¿Estás seguro/a de eliminar la organización? <strong>Esta acción no se puede deshacer.</strong>';
  listUrl = `${environment.api_url}companies`;
  createUrl = `${environment.api_url}companies/create`;
  updateUrl = (element: ModelElement) =>
    `${environment.api_url}companies/update/${element.id}`;
  deleteUrl = (element: ModelElement) =>
    `${environment.api_url}companies/delete/${element.id}`;

  header: Header = {
    title: this.headerTitle,
    buttons: [
      {
        text: 'Añadir',
        icon: 'add_box',
        color: 'primary',
        handle: async () => {
          this.resourceList.openCreate();
        },
        tooltip: '',
      },
    ],
  };
  filterFields: FilterField[] = [
    {
      key: 'enabled',
      width: '156px',
      type: 'select',
      placeholder: 'Por estado',
      appearance: undefined,
      typeSelect: {
        options: [
          { value: null, description: 'Todos' },
          { value: 0, description: 'Deshabilitado' },
          { value: 1, description: 'Habilitado' },
        ],
      },
    },
  ];
  filterButtons: FilterButton[] = [
    {
      text: 'Buscar',
      type: 'submit',
      color: 'primary',
      style: 'flat',
      tooltip: '',
    },
  ];
  infoColumns: InfoColumn[] = [
    { title: '#', property: 'id' },
    { title: 'Nombre', property: 'name' },
    { title: 'Dirección', property: 'address' },
    { title: 'Teléfono', property: 'phone' },
    //{ title: 'Correo', property: 'email' },
    {
      title: 'Estado',
      property: 'getStateEnabled',
      method: (element) => (element.status ? 'Habilitado' : 'Deshabilitado'),
    },
    { title: 'Fecha creación', property: 'createdAt' },
  ];
  displayedColumns: string[] = this.infoColumns
    .map((column) => column.property as string)
    .concat(['actions']);
  itemButtons: ItemButton[] = [
    {
      icon: 'edit',
      style: 'icon',
      tooltip: '',
      handle: async (element: ModelElement) => {
        this.resourceList.openUpdate(element);
      },
    },
    {
      icon: 'delete',
      style: 'icon',
      tooltip: '',
      color: 'warn',
      handle: (element: ModelElement) => this.resourceList.openDelete(element),
    },
  ];
  controls: { [key: string]: Field } = {
    name: {
      key: 'name',
      label: 'Nombre',
      type: 'input',
      typeInput: { type: 'text' },
      required: true,
      requiredMessage: 'El nombre es obligatorio!',
      width: '100%',
    },
    address: {
      key: 'user.address',
      label: 'Dirección',
      type: 'input',
      typeInput: { type: 'text' },
      required: true,
      requiredMessage: 'La dirección es obligatoria!',
      width: '100%',
    },
    status: {
      key: 'status',
      label: 'Estado',
      type: 'select',
      typeSelect: {
        options: [
          { value: 1, description: 'Habilitado' },
          { value: 0, description: 'Deshabilitado' },
        ],
      },
      defaultValue: 1,
      required: true,
      requiredMessage: 'El estado es obligatorio!',
      hidden: (action) => action === 'create',
      width: '50%',
    },
    _status: {
      key: '_status',
      label: 'Estado',
      type: 'select',
      typeSelect: {
        options: [
          { value: 1, description: 'Habilitado' },
          { value: 0, description: 'Deshabilitado' },
        ],
      },
      defaultValue: 1,
      required: true,
      requiredMessage: 'El estado es obligatorio!',
      hidden: (action) => action !== 'create',
      disabled: true,
      width: '50%',
    },
  };
  service: Service = {
    list: {
      url: this.listUrl,
      method: 'get',
    },
    create: {
      url: this.createUrl,
      method: 'post',
      title: this.createTitle,
      color: 'primary',
      successMessage: this.createMessage,
    },
    update: {
      url: this.updateUrl,
      method: 'patch',
      title: this.editTitle,
      color: 'primary',
      successMessage: this.editMessage,
    },
    delete: {
      url: this.deleteUrl,
      method: 'delete',
      title: this.deleteTitle,
      color: 'primary',
      description: this.deleteDescription,
      successMessage: this.deleteMessage,
    },
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
