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
        this.loggedIn = false;
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
        console.log('in init');
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
            if (response.authResponse) {
                console.log("logged in");
                this.loggedIn = true;
            }
            else {
                console.log("not logged in");
                this.loggedIn = false;
            }
        });
    };
    PlayerComponent.prototype.login = function () {
        console.log('in login');
        DZ.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                DZ.api('/user/me', function (response) {
                    console.log('Good to see you, ' + response.name + '. ID: ' + response.id);
                    this.loggedIn = true;
                });
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }.bind(this), { perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access' });
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
        this.loggedIn = true;
    };
    PlayerComponent.prototype.playMusic = function () {
        DZ.player.playPlaylist(1483340617);
    };
    PlayerComponent.prototype.logout = function () {
        DZ.logout();
        this.loggedIn = false;
    };
    PlayerComponent.prototype.createUser = function (input) {
        this._playerService.createNewUser(input);
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
