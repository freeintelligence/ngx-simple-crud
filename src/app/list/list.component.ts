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
    icon: 'edit', color: 'primary', toolTip: 'Editar', handle: (element: any) => this.edit(element),
  }, {
    icon: 'remove_circle', color: 'warn', toolTip: 'Eliminar', handle: (element: any) => this.remove(element),
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

  async updateUser(dialog: DialogEditElementComponent, invalid: boolean) {
    if (invalid) {
      return;
    }

    // await this.sleep(2000);
    const data = await this.http.put(`https://reqres.in/api/users/${dialog.data.element.id}`, dialog.form.value).toPromise();

    dialog.dialogRef.close();

    return data;
  }

  async remove(user: any) {

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
          validators: [ Validators.required ],
          width: '50%',
        }, {
          label: 'Segundo nombre',
          key: 'last_name',
          type: 'input',
          subtype: 'string',
          validators: [ Validators.required ],
          width: '50%',
        }, {
          label: 'Correo electrónico',
          key: 'email',
          type: 'input',
          subtype: 'email',
          validators: [ Validators.required, Validators.email ],
          disabled: true,
          width: '50%',
        }, {
          label: 'Estado',
          key: 'status',
          type: 'select',
          options: [ { value: 0, description: 'Desactivo' }, { value: 1, description: 'Activo' } ],
          validators: [ Validators.required ],
          width: '50%',
        } ],
        buttons: [
          { text: 'Cerrar', handle: (dialog) => dialog.dialogRef.close() },
          { text: 'Guardar', color: 'primary', handle: async (dialog, invalid) => await this.updateUser(dialog, invalid) },
        ]
      } as DataInterface
    });
  }

  async sleep(ms: number = 2000) {
    return new Promise((resolve, reject) => setTimeout(e => resolve(), ms));
  }

}
