import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../index';
import { EmailTemplateModel } from './index';

@Injectable()
export class EmailService {

  constructor(private http: Http) {}

  getAllTemplates(): Observable<string[]> {
    return this.http.get(`${Config.API}/templates?language=EN`)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  getTemplate(id: number): Observable<string[]> {
    return this.http.get(`${Config.API}/templates/${id}?language=EN`)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  addTemplate(template: EmailTemplateModel): Observable<string[]> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    return this.http.post(`${Config.API}/templates/?language=EN`, template, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  editTemplate(template: EmailTemplateModel): Observable<string[]> {
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    return this.http.put(`${Config.API}/templates/${template.id}?language=EN`, template, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteTemplate(id: number): Observable<string[]> {
    return this.http.delete(`${Config.API}/templates/${id}?language=EN`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

