import {Component, OnInit, Inject, forwardRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common'
import {PlayerComponent} from "./player.component";

declare var DZ: any;
declare var firebase: any;

@Component({
  selector: 'player-cmp',
  templateUrl: 'player/templates/dashboard.html',
  styleUrls: ['player/styles/todo.css'],
  directives: [CORE_DIRECTIVES]
})

export class DashboardComponent implements OnInit {

  input:string = 'nothing';
  aresponse:string = 'nothing';

  alpha: any;
  beta: any;
  gamma: any;

  changedTrack: boolean = false;

  teamList: String[];

  constructor(@Inject(forwardRef(() => PlayerComponent)) private _parent:PlayerComponent) {
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

    console.log('nginit dashboard');
  }

  ngOnInit() {
    this.initTeams();
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

      localStorage.setItem('team', snapshot.val().team);
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
    for(var user of userList) {
      firebase.database().ref('users/' + user).on('value', function (snapshot) {
        this.teamList.push(snapshot.val().username);
      }.bind(this));
    }
  }
}
