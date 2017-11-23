import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Video } from '../../model/video';
import { WebserviceService } from '../../service/webservice.service';
import { VideoService } from '../../service/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @ViewChild('canvasRef') canvasRef: ElementRef;
  @ViewChild('videoRef') videoRef: ElementRef;
  @ViewChild('audioRef') audioRef: ElementRef;

  ctx: CanvasRenderingContext2D;
  legenda = "";

  previousVideo: Video;
  actualVideo: Video;
  nextVideo: Video;
  videos: Video[];
  data: any;
  videoIndex: any;
  showPrevious: boolean;
  showNext: boolean;
  loading = true;

  constructor(private renderer: Renderer,
    private service: WebserviceService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.videoIndex = JSON.parse(sessionStorage.getItem('data')).index;

    this.videoService.list()
      .subscribe(res => {
        this.data = res;
        this.videos = this.data.objects;

        this.showPreviousNext();
        this.start();
        this.load();

      }, error => console.log(error));
  }

  load() {
    this.videoRef.nativeElement.load();
    this.audioRef.nativeElement.load();
  }

  /**
   * Inicia vídeo e áudio após ambos estar carregados
   */
  start() {
    let audio = this.audioRef.nativeElement;
    let video = this.videoRef.nativeElement;
    this.actualVideo = this.videos[this.videoIndex];

    this.showVideo();
    this.audioSettings();

    this.renderer.listen(audio, 'loadeddata', event => {
      this.play();
    });

    this.renderer.listen(video, 'loadeddata', event => {
      this.play();
    });
  }

  play() {
    let audio = this.audioRef.nativeElement;
    let video = this.videoRef.nativeElement;

    if (audio.readyState >= 3 && video.readyState >= 3) {
      audio.play();
      this.loading = false;

    } else {
      this.loading = true;
    }
  }

  /**
   * Configurações ao inicia, pausar e alterar o time do áudio
   */
  audioSettings() {
    let c = this;
    let audio = this.audioRef.nativeElement;
    let video = this.videoRef.nativeElement;

    let lastTimeLegend = 0;

    // Pausa o vídeo quando o áudio para de tocar
    this.renderer.listen(audio, 'pause', () => {
      video.pause();
    });

    // Da play no vídeo quando o áudio toca
    this.renderer.listen(audio, 'play', () => {
      video.play();
    });

    // Verifica se há legenda para exibir quando o time do áudio é alterado
    this.renderer.listen(audio, 'timeupdate', () => {
      c.showLegend();
    });
  }


  // Exibe vídeo no canvas
  showVideo() {
    let c = this;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.rect(0, 0, 300, 150);
    this.ctx.fillStyle = "#353535";
    this.ctx.fill();

    let video = this.videoRef.nativeElement;


    this.renderer.listen(video, 'play', () => {
      (function loop() {
        c.ctx.drawImage(video, 0, 0, 300, 150);
        setTimeout(loop, 29.7);
      })();
    });
  }

  // Exibe legenda caso possua
  showLegend() {
    let currentTime = this.audioRef.nativeElement.currentTime;

    // Caso haja legenda para exibir
    if (this.actualVideo.txts instanceof Array) {
      for (let i = 0; i < this.actualVideo.txts.length; i++) {
        const legenda = this.actualVideo.txts[i];

        // Se estiver no tempo da legenda + 3s
        if (legenda.time <= currentTime && currentTime < legenda.time + 3) {
          this.legenda = legenda.txt;
          break;

        } else {
          this.removeLegend();
        }
      }
    }
  }

  removeLegend() {
    this.legenda = "";
  }

  getFile(file: string) {
    return this.data.assetsLocation + "/" + file;
  }

  showPreviousNext() {
    const hasPrevious = this.videoIndex > 0;
    const hasNext = this.videoIndex < this.videos.length - 1;

    this.showPrevious = hasPrevious;
    this.showNext = hasNext;

    if (hasPrevious) {
      this.previousVideo = this.videos[this.videoIndex - 1];
    }

    if (hasNext) {
      this.nextVideo = this.videos[this.videoIndex + 1];
    }
  }


  previous() {
    if (this.videoIndex > 0) {
      this.changeVideo(-1);
    }
  }

  next() {
    if (this.videoIndex < this.videos.length - 1) {
      this.changeVideo(1);
    }
  }

  changeVideo(n: number) {
    this.removeLegend();
    this.audioRef.nativeElement.pause();

    this.videoIndex = this.videoIndex + n;
    this.actualVideo = this.videos[this.videoIndex];
    this.load();
    this.showPreviousNext();
  }
}
