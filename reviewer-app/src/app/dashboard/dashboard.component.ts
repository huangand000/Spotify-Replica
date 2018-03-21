import { Component, OnInit } from '@angular/core';
import { ReviewerService } from '../reviewer.service'
import { ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allPlaylists;
  ratings = [];
  constructor(private _reviewerService: ReviewerService, private router: Router) { }

  ngOnInit() {
    this.getAllPlaylists();
  }

  getAllPlaylists() {
    let observable = this._reviewerService.getPlaylists();
    observable.subscribe(data => {
      console.log(data)
      this.allPlaylists = data;
      for (var i = 0; i < this.allPlaylists.length; i++) {
        console.log(this.allPlaylists[i]['comments'])
        var sum = 0;
        for (var j = 0; j < this.allPlaylists[i]['comments'].length; j++) {
          console.log(this.allPlaylists[i]['comments'][j]['rating'])
          sum += Number(this.allPlaylists[i]['comments'][j]['rating']);
        }
        console.log (sum)
        console.log(this.allPlaylists[i]['comments'].length)
        this.allPlaylists[i]['overallRatings'] = (sum / this.allPlaylists[i]['comments'].length).toFixed(1);
      }
      console.log(this.allPlaylists)
      console.log(this.ratings)
    })
  }

  logout() {
    let observable = this._reviewerService.logoff();
    observable.subscribe(data => {
      console.log(data)
      this.router.navigate(['/login'])
    })
  }
}
