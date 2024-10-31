import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);
  apiURL = '/api/products';

  getUser(userId: string) {
    return this.httpClient.get<Product[]>(`${this.apiURL}?userId=${userId}`);
  }

  getAll() {
    return this.httpClient.get<Product[]>(`${this.apiURL}`);
  }

  get(id: string) {
    return this.httpClient.get<Product>(`${this.apiURL}/${id}`);
  }

  post(payload: ProductPayload) {
    return this.httpClient.post(`${this.apiURL}`, payload);
  }

  put(id: string, payload: ProductPayload) {
    return this.httpClient.put(`${this.apiURL}/${id}`, payload);
  }

  updateStatus(id: string, included: boolean) {
    return this.httpClient.patch(`${this.apiURL}/${id}`, { included });
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.apiURL}/${id}`);
  }
}
