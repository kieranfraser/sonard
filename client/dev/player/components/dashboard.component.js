"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.input = 'nothing';
        this.aresponse = 'nothing';
        this.changedTrack = false;
        window.addEventListener("deviceorientation", function (event) {
            console.log(event.alpha);
            console.log(event.beta);
            console.log(event.gamma);
            this.alpha = event.alpha;
            this.beta = event.beta;
            this.gamma = event.gamma;
            if (event.beta < -20 && this.changedTrack == false) {
                this.nextTrack();
                this.changedTrack = true;
            }
            if (event.beta > 30) {
                this.changedTrack = false;
            }
        }.bind(this), true);
        console.log('nginit dashboard');
        firebase = localStorage.getItem('firebase');
        this.initTeams();
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.nextTrack = function () {
        DZ.player.next();
    };
    DashboardComponent.prototype.playMusic = function () {
        DZ.player.playPlaylist(1483340617);
    };
    DashboardComponent.prototype.geolocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }
        function success(position) {
            console.log('Latitude: ' + position.coords.latitude);
            console.log('Longitude: ' + position.coords.longitude);
        }
    };
    DashboardComponent.prototype.getTeamList = function () {
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
    };
    DashboardComponent.prototype.initTeams = function () {
        var user = localStorage.getItem('user');
        console.log(user);
        firebase.database().ref('users/' + user.id).on('value', function (snapshot) {
            console.log(snapshot.val().team);
            console.log(snapshot.val());
            localStorage.setItem('team', snapshot.val().team);
            console.log('finally');
            console.log(localStorage.getItem('team'));
            console.log(localStorage.getItem('user'));
        }.bind(this));
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/dashboard.html',
            styleUrls: ['player/styles/todo.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
