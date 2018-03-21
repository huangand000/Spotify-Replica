import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service'
@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {
  allSongs;
  mySongs = [];
  listName;
  constructor(private _reviewerService: ReviewerService) { }

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs() {
    let observable = this._reviewerService.getSongs();
    observable.subscribe(data => {
      this.allSongs = data;
      console.log(data)
    })
  }

  removeSong(id) {
    for (var i = 0; i < this.mySongs.length; i ++) {
      console.log(id)
      if (id == this.mySongs[i].id) {
        this.mySongs.splice(i, 1);
        break;
      }
    }
    console.log(this.mySongs)
  }

  addSong(id, name, artist, album, user_name) {
    console.log(this.listName)
    let song = {listName: this.listName, id: id, name: name, artist: artist, album: album, user_name:user_name};
    this.mySongs.push(song);
    // let observable = this._reviewerService.addSongToPlaylist(song) 
  }

  createPlaylist() {
    let observable = this._reviewerService.createPlaylist(this.mySongs);
    observable.subscribe(data => {
      console.log(data)
    })
  }
}
