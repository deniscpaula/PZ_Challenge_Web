import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Video } from '../../model/video';
import { WebserviceService } from '../../service/webservice.service';

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

  video: Video;
  videos: Video[];
  data: any;
  showPrevious: boolean;
  showNext: boolean;

  constructor(private renderer: Renderer, private service: WebserviceService) { }

  ngOnInit() {
    this.data = JSON.parse(sessionStorage.getItem('data'));
    this.videos = this.data['videos'];
    this.showPreviousNext();

    this.start();
    this.load();
  }

  load() {
    this.videoRef.nativeElement.load();
    this.audioRef.nativeElement.load();
  }

  /**
   * Inicia vídeo e áudio após ambos estarem carregados
   */
  start() {
    let audio = this.audioRef.nativeElement;
    let video = this.videoRef.nativeElement;
    this.video = this.videos[this.data['index']];

    this.showVideo();
    this.audioSettings();

    this.renderer.listen(audio, 'loadeddata', event => {
      if (audio.readyState >= 3 && video.readyState >= 3) {
        audio.play();
      }
    });

    this.renderer.listen(video, 'loadeddata', event => {
      if (audio.readyState >= 3 && video.readyState >= 3) {
        audio.play();
      }
    });
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
    if (this.video.txts instanceof Array) {
      for (let i = 0; i < this.video.txts.length; i++) {
        const legenda = this.video.txts[i];

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
    return this.service.url + "assets/" + file;
  }

  previous() {
    if (this.data.index > 0) {
      this.changeVideo(-1);
    }
  }

  next() {
    if (this.data.index < this.videos.length - 1) {
      this.changeVideo(1);
    }
  }

  changeVideo(n: number) {
    this.removeLegend();
    this.audioRef.nativeElement.pause();

    this.data.index = this.data.index + n;
    this.video = this.videos[this.data.index];
    this.load();
    this.showPreviousNext();
  }

  showPreviousNext() {
    this.showPrevious = (this.data.index > 0);
    this.showNext = (this.data.index < this.videos.length - 1);
  }
}
