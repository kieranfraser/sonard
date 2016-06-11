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
var dashboard_component_1 = require("../../player/components/dashboard.component");
var LeaderBoardComponent = (function () {
    function LeaderBoardComponent(_parent) {
        this._parent = _parent;
        this.leaderboard = [];
    }
    LeaderBoardComponent.prototype.ngOnInit = function () {
        this._parent.getFirebase().database().ref('singleLeaderboard').on('value', function (snapshot) {
            console.log(snapshot.val());
            //this.leaderboard = snapshot.val().leaderboard;
            this.leaderboard = [];
            this.populateLeaderboard(snapshot.val().leaderboard);
        }.bind(this));
    };
    LeaderBoardComponent.prototype.populateLeaderboard = function (leaderboard) {
        for (var member in leaderboard) {
            console.log(member);
            console.log(leaderboard[member]);
            console.log(leaderboard[member].id);
            this._parent.getFirebase().database().ref('users/' + leaderboard[member].id).once('value').then(function (member, leaderboard, snapshot) {
                console.log(snapshot.val());
                var name = snapshot.val().username;
                this.leaderboard.push({ name: name, result: leaderboard[member].result });
                console.log('leaderboard - unsorted');
                console.log(this.leaderboard);
                this.leaderboard.sort(function (a, b) { return b.member - a.member; });
                console.log('leaderboard - sorted');
                console.log(this.leaderboard);
            }.bind(this, member, leaderboard));
        }
    };
    LeaderBoardComponent = __decorate([
        core_1.Component({
            selector: 'leaderboard-cmp',
            templateUrl: 'leaderboard/templates/leaderboard-component.html',
            styleUrls: ['leaderboard/styles/leaderboard.css']
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return dashboard_component_1.DashboardComponent; }))), 
        __metadata('design:paramtypes', [dashboard_component_1.DashboardComponent])
    ], LeaderBoardComponent);
    return LeaderBoardComponent;
}());
exports.LeaderBoardComponent = LeaderBoardComponent;
