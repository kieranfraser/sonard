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
var TodoCmp = (function () {
    function TodoCmp() {
        this.title = "Deezer Challenge";
        this.loggedIn = false;
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
    TodoCmp.prototype.ngOnInit = function () {
        console.log('in init');
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
    };
    TodoCmp.prototype.login = function () {
        console.log('in login');
        DZ.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                DZ.api('/user/me', function (response) {
                    console.log('Good to see you, ' + response.name + '.');
                    if (response.name != 'undefined') {
                        this.loggedIn = true;
                    }
                });
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { perms: 'basic_access,email, manage_library, manage_community, listening_history, offline_access' });
    };
    TodoCmp.prototype.status = function () {
        DZ.getLoginStatus(function (response) {
            console.log('status');
            if (response.authResponse) {
                console.log('logged in');
            }
            else {
                // no user session available, someone you dont know
                console.log('not logged in');
            }
        });
    };
    TodoCmp.prototype.myName = function () {
        DZ.api('/user/me', function (response) {
            console.log("My name", response.name);
        });
        // Check support
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }
        function success(position) {
            console.log('Latitude: ' + position.coords.latitude);
            console.log('Longitude: ' + position.coords.longitude);
        }
    };
    TodoCmp.prototype.nextTrack = function () {
        DZ.player.next();
    };
    TodoCmp.prototype.playMusic = function () {
        DZ.player.playPlaylist(1483340617);
    };
    TodoCmp.prototype.logout = function () {
        DZ.logout();
    };
    TodoCmp = __decorate([
        core_1.Component({
            selector: 'todo-cmp',
            templateUrl: 'todo/templates/todo.html',
            styleUrls: ['todo/styles/todo.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TodoCmp);
    return TodoCmp;
}());
exports.TodoCmp = TodoCmp;
