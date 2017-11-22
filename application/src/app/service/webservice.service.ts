import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WebserviceService {

  http: Http;
  headers: Headers;
  url = 'http://pbmedia.pepblast.com/pz_challenge/';

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'text/html');
  }

  get(url: string): Observable<Response> {
    return this.http.get(this.url + url);
  }

}
