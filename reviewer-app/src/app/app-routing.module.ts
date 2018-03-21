import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AddSongComponent } from './add-song/add-song.component'
import { AddPlaylistComponent } from './add-playlist/add-playlist.component'
import { PlaylistComponent } from './playlist/playlist.component'

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addSong', component: AddSongComponent},
  {path: 'addPlaylist', component: AddPlaylistComponent},
  {path: 'playlist/:id', component: PlaylistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
