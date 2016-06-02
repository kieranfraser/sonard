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
var core_1 = require("@angular/core");
var PlayerService = (function () {
    //ToDo: These keys need to be moved to server side
    function PlayerService() {
        var config = {
            apiKey: "AIzaSyA1E0hp_78RcMgHWj7Vpbg6AkHzT2hZfto",
            authDomain: "sonar-11442.firebaseapp.com",
            databaseURL: "https://sonar-11442.firebaseio.com",
            storageBucket: "sonar-11442.appspot.com",
        };
        firebase.initializeApp(config);
    }
    /**
     * Create a new user (on first log-in with deezer account
     * @param value
     */
    PlayerService.prototype.createNewUser = function (id, name, picture_small, allocatedTeam) {
        firebase.database().ref('users/' + id).set({
            username: name,
            picture: picture_small,
            team: allocatedTeam
        });
    };
    /**
     * Check to see if the user is in our user-base already
     * (and hence already assigned a team)
     * @param id
       */
    PlayerService.prototype.checkReturningUser = function (id) {
        firebase.database().ref('users/' + id).on('value', function (snapshot) {
            if (snapshot.val() === undefined) {
                return false;
            }
            else {
                return true;
            }
        });
    };
    /**
     * Return all teams
     */
    PlayerService.prototype.getAllTeams = function () {
        firebase.database().ref('teams').on('value', function (snapshot) {
            return snapshot.val();
        });
    };
    /**
     * Create a new team and add the team to the user
     * @param id - of the user
     */
    PlayerService.prototype.createNewTeam = function (id) {
        var teamRef = firebase.database().ref('teams');
        var newTeamKey = teamRef.push({
            teamName: "create a team name"
        }).key;
        firebase.database().ref('teams/' + newTeamKey + '/members/' + id).set({
            member: true
        });
        return newTeamKey;
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
