import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoListComponent } from './component/video-list/video-list.component';
import { VideoComponent } from './component/video/video.component';

const routes: Routes = [
  { path: '', component: VideoListComponent },
  { path: 'video', component: VideoComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
