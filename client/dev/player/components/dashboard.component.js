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
var Team_1 = require("../../common/models/Team");
var leaderboard_component_1 = require("../../leaderboard/components/leaderboard.component");
var admin_component_1 = require("../../admin/components/admin.component");
var adminCreateTeam_component_1 = require("../../admin/components/adminCreateTeam.component");
var rotatingcube_component_1 = require("../../visualizations/components/rotatingcube.component");
var DashboardComponent = (function () {
    function DashboardComponent(_parent, ref) {
        this._parent = _parent;
        this.ref = ref;
        this.input = 'nothing';
        this.aresponse = 'nothing';
        this.changedTrack = false;
        this.teamAssigned = false;
        this.admin = false;
        this.seek = false;
        this.trackPosition = 0;
        window.addEventListener("deviceorientation", function (event) {
            //console.log(event.alpha);
            //console.log(event.beta);
            //console.log(event.gamma);
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
        window.addEventListener("devicemotion", function (event) {
            /*console.log(event.acceleration.x);
            console.log(event.acceleration.y);
            console.log(event.acceleration.z);
      
            console.log(event.accelerationIncludingGravity.x);
            console.log(event.accelerationIncludingGravity.y);
            console.log(event.accelerationIncludingGravity.z);
      
            console.log(event.rotationRate.alpha);
            console.log(event.rotationRate.beta);
            console.log(event.rotationRate.gamma);*/
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
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log('actual init');
        this.currentTrack();
        this.subscribeToSeek();
        this.teamAssigned = false;
        var teamId = JSON.parse(localStorage.getItem('userF')).teamAssigned;
        if (typeof teamId != "undefined" && teamId != null) {
            this.teamAssigned = true;
            this._parent.getFirebase().database().ref('teams/' + teamId).on('value', function (snapshot) {
                this.teamList = [];
                for (var member in snapshot.val().members) {
                    if (snapshot.val().members.hasOwnProperty(member)) {
                        this.teamList.push(snapshot.val().members[member].name);
                    }
                }
                var assignedTeam = new Team_1.Team(teamId, snapshot.val().name, snapshot.val().genres, this.teamList);
                localStorage.setItem('teamId', teamId);
            }.bind(this));
        }
        this.getTeams();
        if (JSON.parse(localStorage.getItem('userD')).name === 'Kieran.Fraser') {
            console.log('entered admin mode');
            this.admin = true;
            this.subscribeTrackPosition();
        }
        var userId = JSON.parse(localStorage.getItem('userD')).id;
        this._parent.getFirebase().database().ref('results/' + userId).on('value', function (snapshot) {
            console.log(snapshot.val());
        });
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
    DashboardComponent.prototype.play = function () {
        this._parent.getFirebase().database().ref('currentPosition').once('value').then(function (snapshot) {
            console.log(snapshot.val());
            var position = snapshot.val().position;
            console.log('the position', position);
            DZ.player.play();
            this.trackPosition = position;
            this.seek = true;
        }.bind(this));
    };
    DashboardComponent.prototype.subscribeToSeek = function () {
        DZ.Event.subscribe('player_play', function (arg) {
            if (this.seek === true) {
                console.log('seek the player');
                DZ.player.seek(this.trackPosition);
                this.seek = false;
            }
        }.bind(this));
    };
    DashboardComponent.prototype.currentTrack = function () {
        this._parent.getFirebase().database().ref('currentTrack').on('value', function (snapshot) {
            DZ.player.playTracks([snapshot.val().id]);
            localStorage.setItem('currentTrack', JSON.stringify(snapshot.val()));
            console.log('track added', snapshot.val().title);
        }.bind(this));
    };
    DashboardComponent.prototype.subscribeTrackPosition = function () {
        DZ.Event.subscribe('player_position', function (arg) {
            console.log(arg);
            console.log(arg[0]);
            var position = Math.round(((arg[0] / arg[1]) * 100) * 100) / 100;
            this._parent.getFirebase().database().ref('currentPosition').set({
                position: position
            });
        }.bind(this));
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
    DashboardComponent.prototype.ngOnDestroy = function () {
        console.log('destroy');
        this.ref.detach();
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
        var assignedTeam = new Team_1.Team(team.id, team.name, team.genres, team.members);
        localStorage.setItem('teamId', team.id);
        this.teamList = [];
        for (var _i = 0, _a = team.members; _i < _a.length; _i++) {
            var member = _a[_i];
            console.log(member);
            this.teamList.push(member);
        }
        this.teamList.push(JSON.parse(localStorage.getItem('userD')).name);
        this.teamAssigned = true;
    };
    DashboardComponent.prototype.result = function () {
        var number = Math.floor(Math.random() * 6) + 1;
        var userId = JSON.parse(localStorage.getItem('userD')).id;
        this._parent.getFirebase().database().ref('results/' + userId).push({
            result: number
        });
        console.log(number);
    };
    DashboardComponent.prototype.vibrate = function () {
        var vibrate = navigator.vibrate;
        // vibrate for 1 second
        vibrate(1000);
        // vibrate for 1 second, then pause for half, then vibrate for another 1 second
        vibrate([1000, 500, 2000]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/dashboard.html',
            styleUrls: ['player/styles/dashboard.css'],
            directives: [common_1.CORE_DIRECTIVES, adminCreateTeam_component_1.AdminCreateTeam, leaderboard_component_1.LeaderBoardComponent, admin_component_1.AdminComponent, rotatingcube_component_1.RotatingCubeComponent]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return player_component_1.PlayerComponent; }))), 
        __metadata('design:paramtypes', [player_component_1.PlayerComponent, core_1.ChangeDetectorRef])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
