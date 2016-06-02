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
var player_service_1 = require("../services/player.service");
var PlayerComponent = (function () {
    function PlayerComponent(_playerService) {
        this._playerService = _playerService;
        this.title = "Deezer Challenge";
        this.input = 'nothing';
        this.aresponse = 'nothing';
        this.changedTrack = false;
        window.addEventListener("deviceorientation", function (event) {
            // process event.alpha, event.beta and event.gamma
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
    }
    PlayerComponent.prototype.ngOnInit = function () {
        firebase = this._playerService.getFirebaseDB();
        DZ.init({
            appId: '180442',
            channelUrl: 'http://sonard.herokuapp.com/',
            player: {
                container: 'player',
                width: 300,
                height: 300,
                format: 'square',
                onload: function () { }
            }
        });
        DZ.getLoginStatus(function (response) {
            console.log('status');
            if (response.authResponse) {
                console.log('logged in');
            }
            else {
                // no user session available, someone you dont know
                console.log('not logged in');
            }
        }.bind(this));
    };
    PlayerComponent.prototype.login = function () {
        console.log('in login');
        var loggedIn = false;
        DZ.login(function (response) {
            if (response.status == 'connected') {
                console.log('Welcome!  Fetching your information.... ');
                DZ.api('/user/me', function (user) {
                    console.log('Good to see you, ' + user.name + '.');
                    //this._playerService.createNewUser(user.id, user.name, user.picture_small);
                    this.initUser(user);
                }.bind(this));
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }.bind(this), { perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access' });
    };
    PlayerComponent.prototype.createNewUser = function (user) {
    };
    PlayerComponent.prototype.status = function () {
        DZ.getLoginStatus(function (response) {
            console.log('status');
            if (response.authResponse) {
                console.log('logged in');
            }
            else {
                // no user session available, someone you dont know
                console.log('not logged in');
            }
        });
    };
    PlayerComponent.prototype.myName = function () {
        DZ.api('/user/me', function (response) {
            console.log("My name", response.name);
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }
        function success(position) {
            console.log('Latitude: ' + position.coords.latitude);
            console.log('Longitude: ' + position.coords.longitude);
        }
    };
    PlayerComponent.prototype.nextTrack = function () {
        DZ.player.next();
    };
    PlayerComponent.prototype.playMusic = function () {
        DZ.player.playPlaylist(1483340617);
    };
    PlayerComponent.prototype.logout = function () {
        DZ.logout();
    };
    /**
     *
     * @param user
       */
    PlayerComponent.prototype.initUser = function (user) {
        firebase.database().ref('users/' + user.id).on('value', function (snapshot) {
            if (typeof snapshot.val() === "undefined" || snapshot.val() === null) {
                console.log('new user');
                this.checkTeams(user);
            }
            else {
                console.log('returning user');
                console.log(snapshot.val());
            }
        }.bind(this));
    };
    /**
     * Allocate a user to a team (only on first login)
     * @param id
     * @returns {*}
       */
    PlayerComponent.prototype.checkTeams = function (user) {
        firebase.database().ref('teams').on('value', function (snapshot) {
            if (typeof snapshot.val() === "undefined") {
                console.log('all teams undefined');
                this._playerService.createNewTeamAndAddUser(user);
            }
            else {
                // find a partial team
                console.log('there are teams');
                console.log(snapshot.val());
            }
        }.bind(this));
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/todo.html',
            styleUrls: ['player/styles/todo.css'],
            providers: [player_service_1.PlayerService]
        }), 
        __metadata('design:paramtypes', [player_service_1.PlayerService])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
