import {Component, OnInit, Inject, forwardRef, ChangeDetectorRef, OnDestroy} from '@angular/core';
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

export class DashboardComponent implements OnInit, OnDestroy {

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
    //this.ngOnInit();
  }

  ngOnInit() {
    console.log('actual init');
    this.teamAssigned = false;

    var teamId = JSON.parse(localStorage.getItem('userF')).teamAssigned;

    if(typeof teamId != "undefined" && teamId != null){
      this.teamAssigned = true;
      var teamMembers = [];
      this._parent.getFirebase().database().ref('teams/'+teamId).on('value', function(snapshot) {
        for(var member in snapshot.val().members){
          if (snapshot.val().members.hasOwnProperty(member)) {
            teamMembers.push(snapshot.val().members[member].name);
          }
        }
        var assignedTeam = new Team(teamId, snapshot.val().name, snapshot.val().genres, teamMembers);
        localStorage.setItem('teamId', teamId);
      });
    }

    this.getTeams();

    if(JSON.parse(localStorage.getItem('userD')).name === 'Kieran.Fraser'){
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

  getTeams(){
    this._parent.getFirebase().database().ref('teams').on('value', function(snapshot) {

      this.allTeams = [];
      for (var team in snapshot.val()) {
        var id = team;
        var teamObject = snapshot.val()[team];

        var memberList = snapshot.val()[team].members;
        var members = [];
        for(var member in memberList){
          members.push(memberList[member].name);
        }

        this.allTeams.push(new Team(team, teamObject.teamName, teamObject.genres, members));
      }

      this.ref.detectChanges();
    }.bind(this));
  }

  ngOnDestroy(){
    console.log('destroy');
    this.ref.detach();
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
      name: JSON.parse(localStorage.getItem('userD')).name
    });
    this._parent.getFirebase().database().ref('users/'+userId).update({
      teamAssigned: team.id
    });

    var assignedTeam = new Team(team.id, team.name, team.genres, team.members);
    localStorage.setItem('teamId', team.id);
    console.log('saved team:');
    console.log(localStorage.getItem('teamId'));
    console.log(team);
    this.teamList = [];
    console.log(team.members);
    for (var member of team.members) {
        console.log(member);
        this.teamList.push(member);
    }
    console.log(this.teamList);
    this.teamAssigned = true;
  }

}
