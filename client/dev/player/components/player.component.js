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
        this.numberUsersPerTeam = 3;
    }
    PlayerComponent.prototype.ngOnInit = function () {
        firebase = this._playerService.getFirebaseDB();
        this.router.navigate(['/']);
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
                this.router.navigate(['/dashboard']);
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
                    //this._playerService.createNewUser(user.id, user.name);
                    this.initUser(user);
                }.bind(this));
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }.bind(this), { perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access' });
    };
    PlayerComponent.prototype.myName = function () {
        DZ.api('/user/me', function (response) {
            console.log("My name", response.name);
        });
    };
    PlayerComponent.prototype.logout = function () {
        DZ.logout();
        this.router.navigate(['/']);
    };
    /**
     * Initialize the user within the app (whether returning or new user).
     * @param user
       */
    PlayerComponent.prototype.initUser = function (user) {
        firebase.database().ref('users/' + user.id).on('value', function (snapshot) {
            if (typeof snapshot.val() === "undefined" || snapshot.val() === null) {
                this.checkTeams(user);
            }
            else {
                this.router.navigate(['/dashboard']);
            }
        }.bind(this));
    };
    /**
     * Allocate a user to a team (only on first login)
     * @param id
     * @returns {*}
       */
    PlayerComponent.prototype.checkTeams = function (user) {
        firebase.database().ref('teams').once('value').then(function (snapshot) {
            if (typeof snapshot.val() === "undefined") {
                this._playerService.createNewTeamAndAddUser(user);
            }
            else {
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
                        if (numberMembers < this.numberUsersPerTeam) {
                            console.log('less than 3');
                            this._playerService.addUserToExistingTeam(user, team);
                            break;
                        }
                        else if (numberTeams === 1) {
                            console.log('last team');
                            this._playerService.createNewTeamAndAddUser(user);
                        }
                    }
                    numberTeams = numberTeams - 1;
                }
                this.router.navigate(['/dashboard']);
            }
        }.bind(this));
    };
    PlayerComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/todo.html',
            styleUrls: ['player/styles/todo.css'],
            providers: [player_service_1.PlayerService],
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
