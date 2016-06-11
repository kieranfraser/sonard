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
var Team_1 = require("../models/Team");
var adminCreateTeam_component_1 = require("./adminCreateTeam.component");
var DashboardComponent = (function () {
    function DashboardComponent(_parent, ref) {
        this._parent = _parent;
        this.ref = ref;
        this.input = 'nothing';
        this.aresponse = 'nothing';
        this.changedTrack = false;
        this.teamAssigned = false;
        this.admin = false;
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
        //this.initTeams();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log('actual init');
        this.teamAssigned = false;
        var teamId = JSON.parse(localStorage.getItem('userF')).teamAssigned;
        if (typeof teamId != "undefined" && teamId != null) {
            this.teamAssigned = true;
            var teamMembers = [];
            this._parent.getFirebase().database().ref('teams/' + teamId).on('value', function (snapshot) {
                for (var member in snapshot.val().members) {
                    if (snapshot.val().members.hasOwnProperty(member)) {
                        teamMembers.push(snapshot.val().members[member].name);
                    }
                }
                var assignedTeam = new Team_1.Team(teamId, snapshot.val().name, snapshot.val().genres, teamMembers);
                localStorage.setItem('team', JSON.stringify(assignedTeam));
            });
        }
        this.getTeams();
        if (JSON.parse(localStorage.getItem('userD')).name === 'Kieran.Fraser') {
            console.log('entered admin mode');
            this.admin = true;
        }
    };
    DashboardComponent.prototype.getFirebase = function () {
        return this._parent.getFirebase();
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
        var user = localStorage.getItem('userD');
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
     * Populate the team list with user-names
     * @param userList
       */
    DashboardComponent.prototype.populateTeamList = function (userList) {
        this.teamList = [];
        var count = 1;
        for (var _i = 0, userList_1 = userList; _i < userList_1.length; _i++) {
            var user = userList_1[_i];
            firebase.database().ref('users/' + user).on('value', function (snapshot) {
                this.teamList.push(snapshot.val().username);
                console.log(Object.keys(userList).length);
                console.log(count);
                if (count === Object.keys(userList).length) {
                }
                count++;
            }.bind(this));
        }
    };
    DashboardComponent.prototype.getTeams = function () {
        this._parent.getFirebase().database().ref('teams').on('value', function (snapshot) {
            this.allTeams = [];
            for (var team in snapshot.val()) {
                var id = team;
                var teamObject = snapshot.val()[team];
                var memberList = snapshot.val()[team].members;
                var members = [];
                for (var member in memberList) {
                    members.push(memberList[member].name);
                }
                this.allTeams.push(new Team_1.Team(team, teamObject.teamName, teamObject.genres, members));
            }
            this.ref.detectChanges();
        }.bind(this));
    };
    DashboardComponent.prototype.removeTeam = function (team) {
        this._parent.getFirebase().database().ref('teams/' + team.id).remove();
    };
    /**
     * When a user selects a team:
     *  save the user as a member of the active team list
     *  update the user in our db as having a team assigned
     *
     * @param team
       */
    DashboardComponent.prototype.selectedTeam = function (team) {
        var userId = JSON.parse(localStorage.getItem('userD')).id;
        this._parent.getFirebase().database().ref('teams/' + team.id + '/members/' + userId).set({
            name: JSON.parse(localStorage.getItem('userD')).name
        });
        this._parent.getFirebase().database().ref('users/' + userId).update({
            teamAssigned: team.id
        });
        localStorage.setItem('team', JSON.stringify(team));
        console.log('saved team:');
        console.log(localStorage.getItem('team'));
        console.log(JSON.parse(localStorage.getItem('team')));
        this.teamAssigned = true;
        this.teamList = [];
        for (var _i = 0, _a = team.members; _i < _a.length; _i++) {
            var member = _a[_i];
            console.log(member);
            this.teamList.push(team.members[member].name);
        }
        console.log(this.teamList);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/dashboard.html',
            styleUrls: ['player/styles/dashboard.css'],
            directives: [common_1.CORE_DIRECTIVES, adminCreateTeam_component_1.AdminCreateTeam]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return player_component_1.PlayerComponent; }))), 
        __metadata('design:paramtypes', [player_component_1.PlayerComponent, core_1.ChangeDetectorRef])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
