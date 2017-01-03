import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {

  constructor(private http: Http) {}

  get(): Observable<string[]> {
    return this.http.get('http://api.gert.ee/templates?language=EN')
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

