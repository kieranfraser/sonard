import {Component, OnInit, forwardRef, Inject, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {DashboardComponent} from "../../player/components/dashboard.component";

@Component({
  selector: 'leaderboard-cmp',
  templateUrl: 'leaderboard/templates/leaderboard-component.html',
  styleUrls: ['leaderboard/styles/leaderboard.css']
})

export class LeaderBoardComponent implements OnInit, OnDestroy {

  leaderboard = [];

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent,
              private ref: ChangeDetectorRef) {}

  ngOnInit() {

    this._parent.getFirebase().database().ref('singleLeaderboard').on('value', function (snapshot) {
      console.log(snapshot.val());
      //this.leaderboard = snapshot.val().leaderboard;
      this.leaderboard = [];
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
        this.leaderboard.push({name: name, result: leaderboard[member].result});
        console.log('leaderboard - unsorted');
        console.log(this.leaderboard);
        this.leaderboard.sort(function(a,b){return b.member - a.member});
        console.log('leaderboard - sorted');
        console.log(this.leaderboard);
        this.ref.detectChanges();
      }.bind(this, member, leaderboard));
    }
  }

  ngOnDestroy(){
    this.ref.detach();
  }

}
