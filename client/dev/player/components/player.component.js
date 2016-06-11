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
var landing_component_1 = require("./landing.component");
var about_component_1 = require("./about.component");
var dashboard_component_1 = require("./dashboard.component");
var router_1 = require("@angular/router");
var PlayerComponent = (function () {
    function PlayerComponent(_playerService, router) {
        this._playerService = _playerService;
        this.router = router;
        this.title = "Deezer Challenge";
        // This is the number of players allowed per team.
        this.numberUsersPerTeam = 3;
    }
    /**
     * To begin, load the landing page
     * initialize the deezer api
     * check if the user is already logged in with deezer
     */
    PlayerComponent.prototype.ngOnInit = function () {
        firebase = this._playerService.getFirebaseDB();
        this.router.navigate(['/']);
        DZ.init({
            appId: '180442',
            channelUrl: 'http://sonard.herokuapp.com/',
            player: {
                container: 'player',
                width: 300,
                height: 60,
                onload: function () { }
            }
        });
        DZ.Event.subscribe('current_track', function (currentTrack) {
            console.log("current_track");
            console.log(currentTrack);
            DZ.api('/track/' + currentTrack.track.id, function (detail) {
                console.log(detail);
                console.log("BPM: " + detail.bpm);
            });
        });
        DZ.getLoginStatus(function (response) {
            if (response.authResponse) {
                firebase.database().ref('users/' + response.userID).once('value').then(function (snapshot) {
                    localStorage.setItem('userF', JSON.stringify(snapshot.val()));
                    DZ.api('/user/me', function (user) {
                        localStorage.setItem('userD', JSON.stringify(user));
                        //this.router.navigate(['/dashboard']);
                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));
    };
    /**
     * Login to the app
     */
    PlayerComponent.prototype.login = function () {
        var loggedIn = false;
        DZ.login(function (response) {
            if (response.status == 'connected') {
                DZ.api('/user/me', function (user) {
                    this.initUser(user);
                }.bind(this));
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }.bind(this), { perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access' });
    };
    /**
     * Logout of the application
     * clear local storage
     * navigate back to the landing page
     */
    PlayerComponent.prototype.logout = function () {
        DZ.logout();
        var userId = JSON.parse(localStorage.getItem('userD')).id;
        console.log('saved team:');
        console.log(localStorage.getItem('team'));
        console.log(JSON.parse(localStorage.getItem('team')));
        console.log(localStorage.getItem('team'));
        console.log(JSON.parse(localStorage.getItem('team')));
        var teamId = JSON.parse(localStorage.getItem('team')).id;
        firebase.database().ref('teams/' + teamId + '/members/' + userId).remove();
        firebase.database().ref('users/' + userId + '/teamAssigned').remove();
        localStorage.removeItem('userD');
        localStorage.removeItem('userF');
        localStorage.removeItem('team');
        this.router.navigate(['/']);
    };
    /**
     * Initialize the user within the app (whether returning or new user).
     * @param user
       */
    PlayerComponent.prototype.initUser = function (user) {
        firebase.database().ref('users/' + user.id).once('value').then(function (snapshot) {
            localStorage.setItem('userD', JSON.stringify(user));
            if (typeof snapshot.val() === "undefined" || snapshot.val() === null) {
                this.addUser(user);
            }
            else {
                localStorage.setItem('userF', JSON.stringify(snapshot.val()));
                this.router.navigate(['/dashboard']);
            }
        }.bind(this));
    };
    /**
     * Return the firebase instance
     * @returns {any}
       */
    PlayerComponent.prototype.getFirebase = function () {
        return firebase;
    };
    PlayerComponent.prototype.home = function () {
        DZ.getLoginStatus(function (response) {
            if (response.authResponse) {
                this.router.navigate(['/dashboard']);
            }
            else {
                this.router.navigate(['/']);
            }
        }.bind(this));
    };
    PlayerComponent.prototype.addUser = function (user) {
        this._playerService.addUser(user);
        this.router.navigate(['/dashboard']);
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/todo.html',
            styleUrls: ['player/styles/todo.css'],
            providers: [player_service_1.PlayerService, dashboard_component_1.DashboardComponent],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            { path: '/', component: landing_component_1.LandingComponent },
            { path: '/about', component: about_component_1.AboutComponent },
            { path: '/dashboard', component: dashboard_component_1.DashboardComponent }
        ]), 
        __metadata('design:paramtypes', [player_service_1.PlayerService, router_1.Router])
    ], PlayerComponent);
    return PlayerComponent;
}());
exports.PlayerComponent = PlayerComponent;
