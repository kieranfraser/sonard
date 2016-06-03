"use strict";var __decorate=this&&this.__decorate||function(e,t,o,a){var r,n=arguments.length,i=3>n?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,a);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(i=(3>n?r(i):n>3?r(t,o,i):r(t,o))||i);return n>3&&i&&Object.defineProperty(t,o,i),i},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},core_1=require("@angular/core"),player_service_1=require("../services/player.service"),DashboardComponent=function(){function e(e){this._playerService=e,this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0)}return e.prototype.ngOnInit=function(){},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.geolocation=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.getTeamList=function(){},e.prototype.getUserTeamKey=function(){},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/todo.css"],providers:[player_service_1.PlayerService]}),__metadata("design:paramtypes",[player_service_1.PlayerService])],e)}();exports.DashboardComponent=DashboardComponent;