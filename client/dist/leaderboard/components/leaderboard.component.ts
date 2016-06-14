import {Component, OnInit, forwardRef, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {DashboardComponent} from "../../player/components/dashboard.component";

declare var DZ: any;

@Component({
  selector: 'leaderboard-cmp',
  templateUrl: 'leaderboard/templates/leaderboard-component.html',
  styleUrls: ['leaderboard/styles/leaderboard.css']
})

export class LeaderBoardComponent implements OnInit, OnDestroy {

  leaderboardList = [];

  coverImage_medium = "https://upload.wikimedia.org/wikipedia/commons/8/87/Smiley_Face.JPG";

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent,
              private ref: ChangeDetectorRef) {
    this.getFlow();
  }

  ngOnInit() {

    this._parent.getFirebase().database().ref('singleLeaderboard').on('value', function (snapshot) {
      console.log(snapshot.val());
      //this.leaderboard = snapshot.val().leaderboard;
      this.leaderboardList = [];
      this.populateLeaderboard(snapshot.val().leaderboard);
    }.bind(this));
  }

  populateLeaderboard(leaderboard){

    for(var member in leaderboard){
      console.log(member);
      console.log(leaderboard[member]);
      console.log(leaderboard[member].id);
      this._parent.getFirebase().database().ref('users/'+leaderboard[member].id).once('value').then(function(member, leaderboard, snapshot) {
        console.log(snapshot.val());
        var name = snapshot.val().username;
        this.leaderboardList.push({id: leaderboard[member].id, name: name, result: leaderboard[member].result});
        console.log('leaderboard - unsorted');
        console.log(this.leaderboardList);
        this.leaderboardList.sort(function(a,b){return b.result - a.result});
        console.log('leaderboard - sorted');
        console.log(this.leaderboardList);
        localStorage.setItem('leaderId', this.leaderboardList[0].id);
        this.ref.detectChanges();
      }.bind(this, member, leaderboard));
    }
  }

  ngOnDestroy(){
    this.ref.detach();
  }


  getFlow(){
    var userId = JSON.parse(localStorage.getItem('userD')).id;
    DZ.api('/user/'+userId+'/flow', function(response){
      console.log("the flow", response);

      var arrayOfTracks = response.data;
      var randomIndex = Math.round(Math.random()*arrayOfTracks.length) + 1;
      var track = arrayOfTracks[randomIndex];
      var album = track.album;
      console.log(album);

      this.coverImage_medium = album.cover_medium;

    });
  }

}
