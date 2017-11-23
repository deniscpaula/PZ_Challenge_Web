import { Injectable } from '@angular/core';
import { WebserviceService } from './webservice.service';
import { Video } from '../model/video';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VideoService {

  constructor(private service: WebserviceService) { }

  list(): Observable<Video[]> {
    return this.service.get().map(res => res.json());
  }

}
