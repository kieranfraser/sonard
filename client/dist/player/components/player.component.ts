import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../services/player.service";
import {LandingComponent} from "./landing.component";
import {AboutComponent} from "./about.component";
import {DashboardComponent} from "./dashboard.component";
import {Router, Routes, ROUTER_DIRECTIVES} from "@angular/router";


declare var DZ: any;
declare var firebase: any;

@Component({
  selector: 'player-cmp',
  templateUrl: 'player/templates/todo.html',
  styleUrls: ['player/styles/todo.css'],
  providers: [PlayerService],
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {path: '/', component: LandingComponent},
  {path: '/about', component: AboutComponent},
  {path: '/dashboard', component: DashboardComponent}
])

export class PlayerComponent implements OnInit {

  title: string = "Deezer Challenge";

  numberUsersPerTeam : number = 3;

  input:string = 'nothing';
  aresponse:string = 'nothing';

  alpha: any;
  beta: any;
  gamma: any;

  changedTrack: boolean = false;

  constructor(private _playerService: PlayerService, private router: Router) {

    window.addEventListener("deviceorientation", function(event) {
      // process event.alpha, event.beta and event.gamma
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
  }

  ngOnInit() {

    this.router.navigate(['/']);

    firebase = this._playerService.getFirebaseDB();

    DZ.init({
      appId: '180442',
      channelUrl: 'http://sonard.herokuapp.com/',
      player: {
        container: 'player',
        width : 300,
        height : 300,
        format : 'square',
        onload: function () {}
      }
    });

    DZ.getLoginStatus(function(response) {
      console.log('status');
      if (response.authResponse) {
        console.log('logged in');
        // logged in and connected user, someone you know
      } else {
        // no user session available, someone you dont know
        console.log('not logged in');
      }
    }.bind(this));
  }

  login(){
    var loggedIn = false;
    DZ.login(function(response) {
      if (response.status == 'connected') {
        console.log('Welcome!  Fetching your information.... ');
        DZ.api('/user/me', function(user) {
          console.log('Good to see you, ' + user.name + '.');
          //this._playerService.createNewUser(user.id, user.name);
          this.initUser(user);
        }.bind(this));
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }.bind(this), {perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access'});
  }

  status(){
    DZ.getLoginStatus(function(response) {
      console.log('status');
      if (response.authResponse) {
        console.log('logged in');
        // logged in and connected user, someone you know
      } else {
        // no user session available, someone you dont know
        console.log('not logged in');
      }
    });
  }

  myName(){
    DZ.api('/user/me', function(response){
      console.log("My name", response.name);
    });


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }

    function success(position) {
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
    }
  }

  nextTrack(){
    DZ.player.next();
  }

  playMusic(){
    DZ.player.playPlaylist(1483340617);
  }

  logout(){
    DZ.logout();
  }

  /**
   *
   * @param user
     */
  initUser(user){

    firebase.database().ref('users/' + user.id).on('value', function(snapshot) {
      if(typeof snapshot.val() === "undefined" || snapshot.val() === null){
        this.checkTeams(user);
      }
      else{
        // go to home screen

      }
    }.bind(this));
  }

  /**
   * Allocate a user to a team (only on first login)
   * @param id
   * @returns {*}
     */
  checkTeams(user){

    firebase.database().ref('teams').once('value').then(function(snapshot) {

      if(typeof snapshot.val() === "undefined"){
        this._playerService.createNewTeamAndAddUser(user);
      }
      else{
        var teams = JSON.parse(JSON.stringify(snapshot.val()));
        console.log(teams);
        var numberTeams = Object.keys(teams).length;

        for (var team in teams) {
          if (teams.hasOwnProperty(team)) {
            //console.log(JSON.parse(JSON.stringify(teams[team])));
            //console.log((JSON.parse(JSON.stringify(teams[team])).members));
            var members = (JSON.parse(JSON.stringify(teams[team])).members);
            var numberMembers = Object.keys(members).length;

            console.log(numberMembers);

            if(numberMembers < this.numberUsersPerTeam){
              console.log('less than 3');
              this._playerService.addUserToExistingTeam(user, team);
              break;
            }
            else if(numberTeams === 1){
              console.log('last team');
              this._playerService.createNewTeamAndAddUser(user);
            }
          }
          numberTeams = numberTeams - 1;
        }
        //go home
      }
    }.bind(this));
  }
}
