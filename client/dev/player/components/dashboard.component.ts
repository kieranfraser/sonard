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

  me: String = "";
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
    this.me = JSON.parse(localStorage.getItem('user')).name;

    this.getTeams();

    if(JSON.parse(localStorage.getItem('user')).name === 'Kieran.Fraser'){
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
    var user = localStorage.getItem('user');
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

  selectedTeam(team){
    var userId = JSON.parse(localStorage.getItem('user')).id;
    this._parent.getFirebase().database().ref('teams/'+team.id+'/members/'+userId).set({
      member: true
    });
    localStorage.setItem('team', team);
    this.teamAssigned = true;
  }

}
