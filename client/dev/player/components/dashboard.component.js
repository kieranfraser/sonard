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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var player_component_1 = require("./player.component");
var DashboardComponent = (function () {
    function DashboardComponent(_parent, ref) {
        this._parent = _parent;
        this.ref = ref;
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
        console.log('constructor dashboard');
        this.initTeams();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log('actual init');
        this.initTeams();
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
    /**
     * Load the users team list
     */
    DashboardComponent.prototype.initTeams = function () {
        var user = localStorage.getItem('user');
        console.log(JSON.parse(user).id);
        this._parent.getFirebase().database().ref('users/' + JSON.parse(user).id).on('value', function (snapshot) {
            localStorage.setItem('team', snapshot.val().currentTeam);
            this.getTeamList();
        }.bind(this));
    };
    DashboardComponent.prototype.getTeamList = function () {
        console.log('get team list');
        var userList = [];
        this._parent.getFirebase().database().ref('teams/' + localStorage.getItem('team')).on('value', function (snapshot) {
            var members = JSON.parse(JSON.stringify(snapshot.val().members));
            var teamName = JSON.parse(JSON.stringify(snapshot.val().teamName));
            console.log(teamName);
            for (var member in members) {
                if (members.hasOwnProperty(member)) {
                    console.log(member);
                    userList.push(member);
                }
            }
            this.populateTeamList(userList);
        }.bind(this));
    };
    /**
     * Populate the team list with usernames
     * @param userList
       */
    DashboardComponent.prototype.populateTeamList = function (userList) {
        this.teamList = [];
        var count = 0;
        for (var _i = 0, userList_1 = userList; _i < userList_1.length; _i++) {
            var user = userList_1[_i];
            if (userList.hasOwnProperty(user)) {
                firebase.database().ref('users/' + user).on('value', function (snapshot) {
                    this.teamList.push(snapshot.val().username);
                    if (count === Object.keys(userList).length) {
                        this.ref.detectChanges();
                    }
                    count++;
                }.bind(this));
            }
        }
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/dashboard.html',
            styleUrls: ['player/styles/todo.css'],
            directives: [common_1.CORE_DIRECTIVES]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return player_component_1.PlayerComponent; }))), 
        __metadata('design:paramtypes', [player_component_1.PlayerComponent, core_1.ChangeDetectorRef])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
