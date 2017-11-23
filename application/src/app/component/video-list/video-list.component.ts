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

  videos: Video[];

  constructor(private service: WebserviceService,
    private videoService: VideoService,
    private router: Router) { }

  ngOnInit() {
    /* this.videoService.list()
      .subscribe(videos => this.videos = videos,
      error => console.log(error)); */

    this.videos = [
      {
        "name": "A - Blue Lines",
        "bg": "440-BlueLines.mp4",
        "im": "440-BlueLines.jpg",
        "sg": "01180-SP-Piano_One.mp3",
        "txts": [
          {
            "txt": "Nice!!!",
            "time": 2.1
          },
          {
            "txt": "Go ahead!!",
            "time": 10.3
          }
        ]
      },
      {
        "name": "B - Dancing Glow",
        "bg": "442-DancingGlow.mp4",
        "im": "442-DancingGlow.jpg",
        "sg": "01181-SP-Piano_Sunrise.mp3"
      },
      {
        "name": "C - Moving Hearts",
        "bg": "446-MovingHearts.mp4",
        "im": "446-MovingHearts.jpg",
        "sg": "01182-SP-Rain.mp3"
      },
      {
        "name": "D - Outer Space",
        "bg": "447-OuterSpaceSpin.mp4",
        "im": "447-OuterSpaceSpin.jpg",
        "sg": "01183-SP-Baroque.mp3",
        "txts": [
          {
            "txt": "Outer Space!!!",
            "time": 1.0
          },
          {
            "txt": "Good good",
            "time": 15
          }
        ]
      },
      {
        "name": "E - Room Space",
        "bg": "448-RoomSpace.mp4",
        "im": "448-RoomSpace.jpg",
        "sg": "01184-SP-Canon.mp3"
      },
      {
        "name": "F - Space Balls",
        "bg": "449-SpaceBalls.mp4",
        "im": "449-SpaceBalls.jpg",
        "sg": "01185-SP-Dove.mp3"
      },
      {
        "name": "G - Space Light",
        "bg": "450-SpaceLight.mp4",
        "im": "450-SpaceLight.jpg",
        "sg": "01186-SP-Pachelbels.mp3",
        "txts": [
          {
            "txt": "Great title!!!",
            "time": 0.5
          },
          {
            "txt": "Wowwwwwww",
            "time": 12.6
          }
        ]
      },
      {
        "name": "H - Space Movement",
        "bg": "451-SpaceMovement.mp4",
        "im": "451-SpaceMovement.jpg",
        "sg": "01187-SP-Renaissance.mp3"
      },
      {
        "name": "I - Spin Lights",
        "bg": "452-SpinLights.mp4",
        "im": "452-SpinLights.jpg",
        "sg": "01188-SP-Royal.mp3"
      },
      {
        "name": "J - Zen",
        "bg": "454-Zen.mp4",
        "im": "454-Zen.jpg",
        "sg": "01189-SP-Salieri.mp3"
      }
    ];
  }

  getImage(img: string) {
    return this.service.url + 'assets/' + img;
  }

  showVideo(video: Video) {
    sessionStorage.setItem(
      "data", 
      JSON.stringify({
        "videos": this.videos,
        "index": this.videos.indexOf(video)
      })
    );
    this.router.navigate(['/video']);
  }
}
