import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  httpGet(path: string, params = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, params);
  }

  httpPost(path: string, data = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, data);
  }

  httpPut(path: string, data = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, data);
  }

  httpDelete(path: string, params = {}): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}`, params);
  }
}
