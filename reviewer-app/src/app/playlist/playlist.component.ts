import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service'
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  id;
  playlist;
  comment;
  allComments;
  constructor(private _reviewerService: ReviewerService, private route: ActivatedRoute) { 
    this.comment = {comment: '', rating: '', id: this.id}
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        console.log(this.id)
      });
      this.getPlaylist();
      this.getComments();
  }

  getPlaylist() {
    let observable = this._reviewerService.getSpecPlaylist({id:this.id});
    observable.subscribe(data => {
      console.log(data)
      this.playlist = data;
    })
  }

  addComment() {
    this.comment.id = this.id
    console.log(this.comment);
    let observable = this._reviewerService.addComment(this.comment);
    observable.subscribe(data => {
      console.log(data)
      this.getComments()
    })
  }

  getComments() {
    let observable = this._reviewerService.getSpecPlaylist({id:this.id});
    observable.subscribe(data => {
      console.log(data['comments'])
      this.allComments = data['comments']
    })
  }


}
