import {Component, OnInit, Inject, forwardRef, ChangeDetectorRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common'
import {PlayerComponent} from "./player.component";
import {Team} from "../models/Team";
import {AdminCreateTeam} from "./adminCreateTeam.component";

declare var DZ: any;
declare var firebase: any;

@Component({
  selector: 'player-cmp',
  templateUrl: 'player/templates/dashboard.html',
  styleUrls: ['player/styles/dashboard.css'],
  directives: [CORE_DIRECTIVES, AdminCreateTeam]
})

export class DashboardComponent implements OnInit {

  input:string = 'nothing';
  aresponse:string = 'nothing';

  alpha: any;
  beta: any;
  gamma: any;

  changedTrack: boolean = false;

  teamList: String[];

  allTeams: Team[];

  teamAssigned: boolean = false;

  admin: boolean = false;

  constructor(@Inject(forwardRef(() => PlayerComponent)) private _parent:PlayerComponent,
              private ref: ChangeDetectorRef) {
    window.addEventListener("deviceorientation", function(event) {

      console.log(event.alpha);
      console.log(event.beta);
      console.log(event.gamma);

      this.alpha = event.alpha;
      this.beta = event.beta;
      this.gamma = event.gamma;


      if(event.beta < -20 && this.changedTrack == false){
        this.nextTrack();
        this.changedTrack = true;
      }
      if(event.beta > 30){
        this.changedTrack = false;
      }

    }.bind(this), true);

    console.log('constructor dashboard');
    //this.initTeams();
  }

  ngOnInit() {
    console.log('actual init');
    //this.initTeams();
    var teamId = JSON.parse(localStorage.getItem('userF')).teamAssigned;
    console.log(teamId);
    if(typeof teamId != "undefined" && teamId != null){
      this.teamAssigned = true;
      var teamMembers = [];
      this._parent.getFirebase().database().ref('teams/'+teamId).on('value', function(snapshot) {
        console.log(snapshot.val());
        for(var member in snapshot.val().members){
          if (snapshot.val().members.hasOwnProperty(member)) {
            teamMembers.push(member);
            console.log(member);
          }
        }
        var assignedTeam = new Team(teamId, snapshot.val().name, snapshot.val().genres, []);
        localStorage.setItem('team', JSON.stringify(assignedTeam));
      });
    }

    this.getTeams();

    if(localStorage.getItem('userD').name === 'Kieran.Fraser'){
      console.log('entered admin mode');
      this.admin = true;
    }

  }

  getFirebase(){
    return this._parent.getFirebase();
  }

  nextTrack(){
    DZ.player.next();
  }

  playMusic(){
    DZ.player.playPlaylist(1483340617);
  }

  geolocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }

    function success(position) {
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
    }
  }

  /**
   * Load the users team list
   */
  initTeams(){
    var user = localStorage.getItem('userD');
    console.log(JSON.parse(user).id);

    this._parent.getFirebase().database().ref('users/' + JSON.parse(user).id).on('value', function(snapshot) {

      localStorage.setItem('team', snapshot.val().currentTeam);
      this.getTeamList();


    }.bind(this));
  }

  getTeamList(){
    console.log('get team list');
    var userList = [];
    this._parent.getFirebase().database().ref('teams/'+localStorage.getItem('team')).on('value', function(snapshot) {

      var members = JSON.parse(JSON.stringify(snapshot.val().members));
      var teamName = JSON.parse(JSON.stringify(snapshot.val().teamName));

      console.log(teamName);

      for (var member in members) {
        if (members.hasOwnProperty(member)) {
           console.log(member);
           userList.push(member);
        }
      }
      this.populateTeamList(userList);
    }.bind(this));
  }

  /**
   * Populate the team list with usernames
   * @param userList
     */
  populateTeamList(userList){
    this.teamList = [];
    var count = 1;
    for(var user of userList) {
        firebase.database().ref('users/' + user).on('value', function (snapshot) {
          this.teamList.push(snapshot.val().username);
          console.log(Object.keys(userList).length);
          console.log(count);
          if(count === Object.keys(userList).length){
            //this.ref.tick();
          }
          count++;
        }.bind(this));
    }
  }

  getTeams(){
    this._parent.getFirebase().database().ref('teams').on('value', function(snapshot) {

      this.allTeams = [];
      for (var team in snapshot.val()) {
        var id = team;
        var teamObject = snapshot.val()[team];
        this.allTeams.push(new Team(team, teamObject.teamName, teamObject.genres, []));
      }

      this.ref.detectChanges();
    }.bind(this));
  }

  removeTeam(team){
    this._parent.getFirebase().database().ref('teams/'+team.id).remove();
  }

  /**
   * When a user selects a team:
   *  save the user as a member of the active team list
   *  update the user in our db as having a team assigned
   *
   * @param team
     */
  selectedTeam(team){
    var userId = JSON.parse(localStorage.getItem('userD')).id;
    this._parent.getFirebase().database().ref('teams/'+team.id+'/members/'+userId).set({
      member: true
    });
    this._parent.getFirebase().database().ref('users/'+userId).update({
      teamAssigned: team.id
    });
    localStorage.setItem('team', team);
    this.teamAssigned = true;
  }

}
