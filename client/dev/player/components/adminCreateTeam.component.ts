import {Component, OnInit, forwardRef, Inject} from '@angular/core';
import {Team} from "../models/Team";
import {DashboardComponent} from "./dashboard.component";

@Component({
  selector: 'create-team',
  templateUrl: 'player/templates/create-team.html',
  styleUrls: ['player/styles/todo.css']
})

export class AdminCreateTeam implements OnInit {

  firebase: any;

  teamModel = new Team("", "", "", []);

  submitted = false;

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent) {
    this.firebase = this._parent.getFirebase();
  }

  ngOnInit() {}

  onSubmit(){
    this.submitted = true;

    var teamRef = this.firebase.database().ref('teams');

    var newTeamKey = teamRef.push({
      teamName: this.teamModel.name,
      genres: this.teamModel.genres
    }).key;
  }

}
