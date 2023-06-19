import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private urlAPI: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.urlAPI + '/roles/');
  }
}
