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
  providers: [PlayerService, DashboardComponent],
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
  {path: '/', component: LandingComponent},
  {path: '/about', component: AboutComponent},
  {path: '/dashboard', component: DashboardComponent}
])

export class PlayerComponent implements OnInit {

  title: string = "Deezer Challenge";

  // This is the number of players allowed per team.
  numberUsersPerTeam : number = 3;

  constructor(private _playerService: PlayerService, private router: Router) {}

  /**
   * To begin, load the landing page
   * initialize the deezer api
   * check if the user is already logged in with deezer
   */
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

        firebase.database().ref('users/' + response.userID).once('value').then(function(snapshot) {

          localStorage.setItem('userF', JSON.stringify(snapshot.val()));

          DZ.api('/user/me', function(user) {

            localStorage.setItem('userD', JSON.stringify(user));
            //this.router.navigate(['/dashboard']);

          }.bind(this));

        }.bind(this));

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

  /**
   * Logout of the application
   * clear local storage
   * navigate back to the landing page
   */
  logout(){
    DZ.logout();
    var userId = JSON.parse(localStorage.getItem('userD')).id;

    if(typeof localStorage.getItem('team') != "undefined" && localStorage.getItem('team') != null){

      console.log('saved team:');
      console.log(localStorage.getItem('team'));

      console.log(JSON.parse(localStorage.getItem('team')));

      console.log(localStorage.getItem('team'));
      console.log(JSON.parse(localStorage.getItem('team')));
      var teamId = JSON.parse(localStorage.getItem('team')).id;

      firebase.database().ref('teams/'+teamId+'/members/'+userId).remove();

      localStorage.removeItem('team');
    }

    firebase.database().ref('users/'+userId+'/teamAssigned').remove();
    localStorage.removeItem('userD');
    localStorage.removeItem('userF');
    this.router.navigate(['/']);
  }

  /**
   * Initialize the user within the app (whether returning or new user).
   * @param user
     */
  initUser(user){

    firebase.database().ref('users/' + user.id).once('value').then(function(snapshot) {
      localStorage.setItem('userD', JSON.stringify(user));
      if(typeof snapshot.val() === "undefined" || snapshot.val() === null){
        this.addUser(user);
      }
      else{
        localStorage.setItem('userF', JSON.stringify(snapshot.val()));
        this.router.navigate(['/dashboard']);
      }
    }.bind(this));
  }

  /**
   * Return the firebase instance
   * @returns {any}
     */
  getFirebase(){
    return firebase;
  }

  home(){
    DZ.getLoginStatus(function(response) {
      if (response.authResponse) {
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/']);
      }
    }.bind(this));
  }

  addUser(user){
    this._playerService.addUser(user);
    this.router.navigate(['/dashboard']);
  }
}
