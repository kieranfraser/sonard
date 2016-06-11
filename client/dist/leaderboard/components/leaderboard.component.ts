import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {DashboardComponent} from "../../player/components/dashboard.component";

@Component({
  selector: 'leaderboard-cmp',
  templateUrl: 'leaderboard/templates/leaderboard-component.html',
  styleUrls: ['leaderboard/styles/leaderboard.css']
})

export class LeaderBoardComponent implements OnInit {

  leaderboard = [];

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent) {}

  ngOnInit() {

    this._parent.getFirebase().database().ref('singleLeaderboard').on('value', function (snapshot) {
      console.log(snapshot.val());
      this.leaderboard = snapshot.val().leaderboard;
    }.bind(this));
  }

}
