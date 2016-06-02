"use strict";var __decorate=this&&this.__decorate||function(t,e,o,a){var n,r=arguments.length,i=3>r?e:null===a?a=Object.getOwnPropertyDescriptor(e,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,a);else for(var c=t.length-1;c>=0;c--)(n=t[c])&&(i=(3>r?n(i):r>3?n(e,o,i):n(e,o))||i);return r>3&&i&&Object.defineProperty(e,o,i),i},__metadata=this&&this.__metadata||function(t,e){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(t,e):void 0},core_1=require("@angular/core"),DashboardComponent=function(){function t(){this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(t){console.log(t.alpha),console.log(t.beta),console.log(t.gamma),this.alpha=t.alpha,this.beta=t.beta,this.gamma=t.gamma,t.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),t.beta>30&&(this.changedTrack=!1)}.bind(this),!0)}return t.prototype.ngOnInit=function(){DZ.init({appId:"180442",channelUrl:"http://sonard.herokuapp.com/",player:{container:"player",width:300,height:300,format:"square",onload:function(){}}})},t.prototype.nextTrack=function(){DZ.player.next()},t.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},t.prototype.geolocation=function(){function t(t){console.log("Latitude: "+t.coords.latitude),console.log("Longitude: "+t.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(t)},t=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/todo.css"]}),__metadata("design:paramtypes",[])],t)}();exports.DashboardComponent=DashboardComponent;