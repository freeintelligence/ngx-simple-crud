import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ManagerCreateParametersService,
  ManagerCreateParametersServiceData,
} from './manager-create.parameters';

@Injectable({
  providedIn: 'root',
})
export class ManagerCreateService {
  constructor(private http: HttpClient) {}

  storeSubscribe(
    service: ManagerCreateParametersService,
    data: ManagerCreateParametersServiceData
  ) {
    const method = service.method || 'GET';
    const url = service.url(data);
    const body =
      typeof service.body === 'function'
        ? service.body(data.value.json)
        : undefined;

    switch (method) {
      case 'GET':
        return this.http.get(url, { observe: 'response' });
      case 'POST':
        return this.http.post(url, body, { observe: 'response' });
      case 'PATCH':
        return this.http.patch(url, body, { observe: 'response' });
      case 'DELETE':
        return this.http.delete(url, { observe: 'response' });
      case 'PUT':
        return this.http.put(url, body, { observe: 'response' });
      default:
        throw new Error('Invalid method');
    }
  }

  store(
    service: ManagerCreateParametersService,
    data: ManagerCreateParametersServiceData
  ): Promise<HttpResponse<Object>> {
    return new Promise((resolve, reject) => {
      const result = this.storeSubscribe(service, data);

      result?.subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
