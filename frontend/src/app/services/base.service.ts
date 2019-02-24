import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import urljoin from "url-join";

@Injectable()
export class BaseService<TModel> {
  /**
   *
   */

  constructor(protected http: HttpClient, protected endPoint: string) {
    this.endPoint = urljoin(environment.apiUrl, endPoint);
  }

  getItems(): Observable<TModel[]> {
    return this.http.get<TModel[]>(this.endPoint);
  }

  removeItem(itemId: string | number) {
    return this.http.delete<TModel>(urljoin(this.endPoint, itemId.toString(), '/'));
  }

  createItem(item: TModel): Observable<TModel> {
    return this.http.post<TModel>(this.endPoint, item);
  }

  editItem(itemId: number | string, item: TModel): Observable<TModel> {
    const url = urljoin(this.endPoint, itemId.toString(), '/');
    return this.http.put<TModel>(url, item);
  }

  getItem(itemId: number | string): Observable<TModel> {
    const url = urljoin(this.endPoint, itemId.toString());
    return this.http.get<TModel>(url);
  }
}
