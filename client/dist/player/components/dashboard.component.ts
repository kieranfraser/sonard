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

    this.initTeams();
  }

  ngOnInit() {


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

  getTeamList(){

    /*firebase.database().ref('teams').on('value', function(snapshot) {

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
    }.bind(this));*/
  }

  initTeams(){
    var user = localStorage.getItem('user');
    console.log(user);

    this._parent.getFirebase().database().ref('users/' + user.id).on('value', function(snapshot) {

      console.log(snapshot.val().team);
      console.log(snapshot.val());
      localStorage.setItem('team', snapshot.val().team);

      console.log('finally');
      console.log(localStorage.getItem('team'));
      console.log(localStorage.getItem('user'));

    }.bind(this));
  }
}
