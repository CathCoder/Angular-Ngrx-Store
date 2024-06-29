import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associate } from '../store/Model/Associatemodel';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  baseurl = 'http://localhost:3000/associates';
  constructor(private http: HttpClient) {

  }
  GetAll() {
    return this.http.get<Associate[]>(this.baseurl);
  }

  Getbycode(code: number) {
    return this.http.get<Associate>(this.baseurl + '/' + code);
  }

  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }

  Update(data: Associate) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }

  Create(data: Associate) {
    return this.http.post(this.baseurl, data);
  }

}
