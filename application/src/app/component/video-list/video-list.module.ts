import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebserviceService } from '../../service/webservice.service';
import { VideoListComponent } from './video-list.component';
import { VideoService } from '../../service/video.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ VideoListComponent ],
  providers: [ WebserviceService, VideoService ]
})
export class VideoListModule { }
