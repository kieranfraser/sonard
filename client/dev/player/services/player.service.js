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
        localStorage.setItem('firebase', firebase);
    }
    /**
     * Create a new user (on first log-in with deezer account
     * @param value
     */
    PlayerService.prototype.createNewUser = function (user, allocatedTeam) {
        firebase.database().ref('users/' + user.id).set({
            username: user.name
        });
        this.updateExistingUser(user, allocatedTeam);
    };
    /**
     * Update the list of teams the user has participated in.
     * @param user
     * @param allocatedTeam
       */
    PlayerService.prototype.updateExistingUser = function (user, allocatedTeam) {
        firebase.database().ref('users/' + user.id + '/team').push({
            team: allocatedTeam
        }).key;
    };
    /**
     * Get the firebase database
     * @returns {any}
       */
    PlayerService.prototype.getFirebaseDB = function () {
        return firebase;
    };
    /**
     * Create a new team and add the team to the user
     * @param id - of the user
     */
    PlayerService.prototype.createNewTeamAndAddUser = function (user, returning) {
        var teamRef = firebase.database().ref('teams');
        var newTeamKey = teamRef.push({
            teamName: "create a team name"
        }).key;
        console.log('key');
        console.log(newTeamKey);
        firebase.database().ref('teams/' + newTeamKey + '/members/' + user.id).set({
            member: true
        });
        if (returning) {
            this.updateExistingUser(user, newTeamKey);
        }
        else {
            console.log('new');
            this.createNewUser(user, newTeamKey);
        }
    };
    PlayerService.prototype.addUserToExistingTeam = function (user, teamKey, returning) {
        firebase.database().ref('teams/' + teamKey + '/members/' + user.id).set({
            member: true
        });
        if (returning) {
            this.updateExistingUser(user, teamKey);
        }
        else {
            this.createNewUser(user, teamKey);
        }
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
