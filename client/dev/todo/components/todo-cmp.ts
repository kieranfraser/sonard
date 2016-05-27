import {Component, OnInit} from '@angular/core';

declare var DZ: any;

@Component({
  selector: 'todo-cmp',
  templateUrl: 'todo/templates/todo.html',
  styleUrls: ['todo/styles/todo.css']
})
export class TodoCmp implements OnInit {

  title: string = "Deezer Challenge";

  alpha: any;
  beta: any;
  gamma: any;

  changedTrack: boolean = false;

  constructor() {
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
    console.log('in init');
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
  }

  login(){
    console.log('in login');

    DZ.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        DZ.api('/user/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access'});
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

    // Check support
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

}
