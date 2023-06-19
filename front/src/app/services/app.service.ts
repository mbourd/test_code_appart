import { HttpClient, HttpParams } from '@angular/common/http';
import { ElementRef, Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private templates: { [key: string]: TemplateRef<any> } = {};
  private urlAPI: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  addTemplate(name: string, ref: TemplateRef<any>) {
    this.templates[name] = ref;
  }
  getTemplate(name: string): TemplateRef<any> {
    return this.templates[name];
  }
}
