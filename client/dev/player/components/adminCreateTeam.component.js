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
var Team_1 = require("../models/Team");
var dashboard_component_1 = require("./dashboard.component");
var AdminCreateTeam = (function () {
    function AdminCreateTeam(_parent) {
        this._parent = _parent;
        this.teamModel = new Team_1.Team("", "", "", []);
        this.submitted = false;
        this.firebase = this._parent.getFirebase();
    }
    AdminCreateTeam.prototype.ngOnInit = function () { };
    AdminCreateTeam.prototype.onSubmit = function () {
        this.submitted = true;
        var teamRef = this.firebase.database().ref('teams');
        var newTeamKey = teamRef.push({
            teamName: this.teamModel.name,
            genres: this.teamModel.genres
        }).key;
    };
    AdminCreateTeam = __decorate([
        core_1.Component({
            selector: 'create-team',
            templateUrl: 'player/templates/create-team.html',
            styleUrls: ['player/styles/todo.css']
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return dashboard_component_1.DashboardComponent; }))), 
        __metadata('design:paramtypes', [dashboard_component_1.DashboardComponent])
    ], AdminCreateTeam);
    return AdminCreateTeam;
}());
exports.AdminCreateTeam = AdminCreateTeam;
