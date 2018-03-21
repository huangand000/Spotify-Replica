import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReviewerService } from './reviewer.service'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddSongComponent } from './add-song/add-song.component';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';
import { PlaylistComponent } from './playlist/playlist.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddSongComponent,
    AddPlaylistComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ReviewerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
