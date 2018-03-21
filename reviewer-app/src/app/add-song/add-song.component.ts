import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service'

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  song;
  allSongs;
  constructor(private _reviewerService: ReviewerService) {
    this.song = {artist: '', name: '', album: ''}
   }

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

  add() {
    let observable = this._reviewerService.addSong(this.song);
    observable.subscribe(data => {
      console.log(data)
    })

  }

}
