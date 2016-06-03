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
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.input = 'nothing';
        this.aresponse = 'nothing';
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
    DashboardComponent.prototype.ngOnInit = function () { };
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
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'player-cmp',
            templateUrl: 'player/templates/dashboard.html',
            styleUrls: ['player/styles/todo.css', 'player/styles/style.css', 'player/styles/style-responsive.css',
                'player/styles/table-responsive.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
