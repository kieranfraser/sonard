import {Component, OnInit} from '@angular/core';
import {Team} from "../../../dist/player/models/Team";

@Component({
  selector: 'create-team',
  templateUrl: 'player/templates/create-team.html',
  styleUrls: ['player/styles/todo.css']
})

export class AdminCreateTeam implements OnInit {

  firebase: any;

  teamModel = new Team("", "", "", []);

  submitted = false;

  constructor() {
    this.firebase = localStorage.getItem('firebase');
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
