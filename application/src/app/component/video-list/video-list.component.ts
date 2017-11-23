import { Component, OnInit } from '@angular/core';
import { Video } from '../../model/video';
import { WebserviceService } from '../../service/webservice.service';
import { VideoService } from '../../service/video.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  json: any;
  videos: Video[];

  constructor(private service: WebserviceService,
    private videoService: VideoService,
    private router: Router) { }

  ngOnInit() {    
    this.videoService.list()
      .subscribe(res => {
        this.json = res
        this.videos = this.json.objects;
      },
      error => console.log(error));
  }

  getImage(img: string) {
    return this.json.assetsLocation + '/' + img;
  }

  showVideo(video: Video) {
    sessionStorage.setItem(
      "data", JSON.stringify({
        "index": this.videos.indexOf(video)
      })
    );
    this.router.navigate(['/video']);
  }
}
