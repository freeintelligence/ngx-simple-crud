import { Component, OnInit } from '@angular/core';
import { FilterForm, ColumnInfo, FilterEvent, ActionButton, Utils, DialogEditElementComponent, Paginator, DataInterface } from 'ngx-simple-crud';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  filters: FilterForm[] = [
    {
      name: 'filter_by_first_name',
      type: 'input',
      subtype: 'text',
      placeholder: 'Buscar por nombre',
    }
  ];

  infoColumns: ColumnInfo[] = [
    { title: '#', key: 'id' },
    { title: 'Primer nombre', key: 'first_name' },
    { title: 'Segundo nombre', key: 'last_name' },
    { title: 'Correo electrónico', key: 'email' },
  ];

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'actions' ];

  buttons: ActionButton[] = [ {
    icon: 'edit', color: 'primary', toolTip: 'Editar', handle: (element: any) => this.edit(element)
  }, {
    text: 'Prueba', handle: (element: any) => null,
  } ];

  filter = (options: FilterEvent) => this.getUsers(options);

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
  }

  async getUsers(options: FilterEvent): Promise<Paginator> {
    // await this.sleep(1000);
    const data: any = await this.http.get('https://reqres.in/api/users', { params: Object.assign({ page: options.pageIndex.toString(), per_page: options.pageSize.toString() }, Utils.cleanObject(options.filters)) }).toPromise();
    const paginator = new Paginator();

    paginator.total = data.total;
    paginator.data = data.data;

    return paginator;
  }

  async updateUser(dialog: DialogEditElementComponent) {
    const data = await this.http.put(`https://reqres.in/api/users/${dialog.data.element.id}`, dialog.form.value).toPromise();

    dialog.dialogRef.close();

    return data;
  }

  async edit(user: any) {
    this.dialog.open(DialogEditElementComponent, {
      width: '512px',
      data: {
        title: 'Modificar usuario',
        element: user,
        controls: [ {
          label: 'Primer nombre',
          key: 'first_name',
          type: 'input',
          subtype: 'string',
          validators: [ Validators.required ]
        }, {
          label: 'Segundo nombre',
          key: 'second_name',
          type: 'input',
          subtype: 'string',
          validators: [ Validators.required ],
        }, {
          label: 'Correo electrónico',
          key: 'email',
          type: 'input',
          subtype: 'email',
          validators: [ Validators.required, Validators.email ],
        }, {
          label: 'Estado',
          key: 'status',
          type: 'select',
          options: [ { value: undefined, description: 'Todos' }, { value: 0, description: 'Desactivo' }, { value: 1, description: 'Activo' } ],
          validators: [],
        } ],
        buttons: [
          { text: 'Cerrar', handle: (dialog) => dialog.dialogRef.close() },
          { text: 'Guardar', color: 'primary', handle: async (dialog) => await this.updateUser(dialog) },
        ]
      } as DataInterface
    });
  }

  async sleep(ms: number = 2000) {
    return new Promise((resolve, reject) => setTimeout(e => resolve(), ms));
  }

}
