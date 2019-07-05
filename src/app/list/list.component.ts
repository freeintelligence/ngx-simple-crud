import { Component, OnInit } from '@angular/core';
import { FilterForm, ColumnInfo, FilterEvent } from 'ngx-simple-crud';
import { Paginator } from 'ngx-simple-crud';
import { HttpClient } from '@angular/common/http';

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

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email' ];

  filter = (options: FilterEvent) => this.getUsers(options);

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async getUsers(options: FilterEvent): Promise<Paginator> {
    await this.sleep(3000);

    const data: any = await this.http.get('https://reqres.in/api/users', { params: Object.assign({ page: options.pageIndex.toString(), per_page: options.pageSize.toString() }, options.filters) }).toPromise();
    const paginator = new Paginator();

    paginator.total = data.total;
    paginator.data = data.data;

    return paginator;
  }

  async sleep(ms: number = 2000) {
    return new Promise((resolve, reject) => setTimeout(e => resolve(), ms));
  }

}
