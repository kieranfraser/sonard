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

  constructor(private _playerService: PlayerService, private router: Router) {}

  ngOnInit() {

    firebase = this._playerService.getFirebaseDB();

    this.router.navigate(['/']);

    DZ.init({
      appId: '180442',
      channelUrl: 'http://sonard.herokuapp.com/',
      player: {
        container: 'player',
        width : 300,
        height : 60,
        onload: function () {}
      }
    });

    DZ.Event.subscribe('current_track', function(currentTrack){
      console.log("current_track");
      console.log(currentTrack);

      DZ.api('/track/' + currentTrack.track.id, function(detail){
        console.log(detail);
        console.log("BPM: " + detail.bpm);
      });
    });

    DZ.getLoginStatus(function(response) {
      if (response.authResponse) {
        console.log('already logged in');
        this.router.navigate(['/dashboard']);
      }
    }.bind(this));
  }

  /**
   * Login to the app
   */
  login(){
    var loggedIn = false;
    DZ.login(function(response) {
      if (response.status == 'connected') {
        DZ.api('/user/me', function(user) {
          this.initUser(user);
        }.bind(this));
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }.bind(this), {perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access'});
  }
  myName(){
    DZ.api('/user/me', function(response){
      console.log("My name", response.name);
    });
  }

  logout(){
    DZ.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('team');
    this.router.navigate(['/']);
  }

  /**
   * Initialize the user within the app (whether returning or new user).
   * @param user
     */
  initUser(user){

    firebase.database().ref('users/' + user.id).on('value', function(snapshot) {
      if(typeof snapshot.val() === "undefined" || snapshot.val() === null){
        this.checkTeams(user);
      }
      else{
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
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
        this.router.navigate(['/dashboard']);
      }
    }.bind(this));
  }

  getFirebase(){
    return firebase;
  }
}
