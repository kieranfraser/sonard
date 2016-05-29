"use strict";var __decorate=this&&this.__decorate||function(e,o,t,n){var a,i=arguments.length,r=3>i?o:null===n?n=Object.getOwnPropertyDescriptor(o,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,o,t,n);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(r=(3>i?a(r):i>3?a(o,t,r):a(o,t))||r);return i>3&&r&&Object.defineProperty(o,t,r),r},__metadata=this&&this.__metadata||function(e,o){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,o):void 0},core_1=require("@angular/core"),player_service_1=require("../services/player.service"),PlayerComponent=function(){function e(e){this._playerService=e,this.title="Deezer Challenge",this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0)}return e.prototype.ngOnInit=function(){console.log("in init"),DZ.init({appId:"180442",channelUrl:"http://sonard.herokuapp.com/",player:{container:"player",width:300,height:300,format:"square",onload:function(){}}}),DZ.getLoginStatus(function(e){e.authResponse?(console.log("logged in"),this.loggedIn=!0):(console.log("not logged in"),this.loggedIn=!1)})},e.prototype.login=function(){console.log("in login"),DZ.login(function(e){e.authResponse?(console.log("Welcome!  Fetching your information.... "),DZ.api("/user/me",function(e){console.log("Good to see you, "+e.name+"."),this._playerService.createNewUser(e)})):console.log("User cancelled login or did not fully authorize.")}.bind(this),{perms:"basic_access,email, manage_library, manage_community, listening_history, offline_access"})},e.prototype.status=function(){DZ.getLoginStatus(function(e){console.log("status"),e.authResponse?console.log("logged in"):console.log("not logged in")})},e.prototype.myName=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}DZ.api("/user/me",function(e){console.log("My name",e.name)}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.logout=function(){DZ.logout()},e.prototype.createUser=function(e){this._playerService.createNewUser(e)},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/todo.html",styleUrls:["player/styles/todo.css"],providers:[player_service_1.PlayerService]}),__metadata("design:paramtypes",[player_service_1.PlayerService])],e)}();exports.PlayerComponent=PlayerComponent;