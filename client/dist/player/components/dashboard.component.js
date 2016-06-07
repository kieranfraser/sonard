"use strict";var __decorate=this&&this.__decorate||function(t,e,o,a){var n,r=arguments.length,c=3>r?e:null===a?a=Object.getOwnPropertyDescriptor(e,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,a);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(3>r?n(c):r>3?n(e,o,c):n(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c},__metadata=this&&this.__metadata||function(t,e){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(t,e):void 0},__param=this&&this.__param||function(t,e){return function(o,a){e(o,a,t)}},core_1=require("@angular/core"),common_1=require("@angular/common"),player_component_1=require("./player.component"),DashboardComponent=function(){function t(t){this._parent=t,this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(t){console.log(t.alpha),console.log(t.beta),console.log(t.gamma),this.alpha=t.alpha,this.beta=t.beta,this.gamma=t.gamma,t.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),t.beta>30&&(this.changedTrack=!1)}.bind(this),!0),console.log("constructor dashboard")}return t.prototype.ngOnInit=function(){console.log("actual init")},t.prototype.nextTrack=function(){DZ.player.next()},t.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},t.prototype.geolocation=function(){function t(t){console.log("Latitude: "+t.coords.latitude),console.log("Longitude: "+t.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(t)},__decorate([core_1.Input("teamList"),__metadata("design:type",Array)],t.prototype,"teamList",void 0),t=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/todo.css"],directives:[common_1.CORE_DIRECTIVES]}),__param(0,core_1.Inject(core_1.forwardRef(function(){return player_component_1.PlayerComponent}))),__metadata("design:paramtypes",[player_component_1.PlayerComponent])],t)}();exports.DashboardComponent=DashboardComponent;