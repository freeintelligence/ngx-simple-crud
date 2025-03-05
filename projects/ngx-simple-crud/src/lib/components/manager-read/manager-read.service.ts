import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ManagerReadParametersService,
  ManagerReadParametersServiceData,
} from './manager-read.parameters';

@Injectable({
  providedIn: 'root',
})
export class ManagerReadService {
  constructor(private http: HttpClient) {}

  getSubscribe(
    service: ManagerReadParametersService,
    data: ManagerReadParametersServiceData
  ) {
    const method = service.method || 'GET';
    const url = service.url(data);
    const body =
      typeof service.body === 'function' ? service.body(data) : undefined;

    switch (method) {
      case 'GET':
        return this.http.get(url);
      case 'POST':
        return this.http.post(url, body);
      case 'PATCH':
        return this.http.patch(url, body);
      case 'DELETE':
        return this.http.delete(url);
      case 'PUT':
        return this.http.put(url, body);
      default:
        throw new Error('Invalid method');
    }
  }

  get(
    service: ManagerReadParametersService,
    data: ManagerReadParametersServiceData
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const result = this.getSubscribe(service, data);

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
