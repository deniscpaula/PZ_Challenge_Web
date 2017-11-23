import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebserviceService {

  jsonp: Jsonp;
  http: Http;
  
  constructor(jsonp: Jsonp, http: Http) {
    this.http = http;
    this.jsonp = jsonp;
  }

  get(): Observable<Response> {
    // Teste JSONP - Work
    // const path = 'https://itunes.apple.com/search?term=ff&media=music&limit=20&callback=JSONP_CALLBACK';
    
    // Doesn't work
    // const path = 'http://pbmedia.pepblast.com/pz_challenge/assets-jsonp.json?callback=JSONP_CALLBACK';
    // return this.jsonp.request(path);

    // Erro CORS
    // return this.http.get('http://pbmedia.pepblast.com/pz_challenge/assets.json');

    return this.http.get('https://s3-sa-east-1.amazonaws.com/pzchallange/assets.json');
  }

}
