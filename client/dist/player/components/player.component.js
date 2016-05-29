"use strict";var __decorate=this&&this.__decorate||function(e,t,o,n){var a,i=arguments.length,l=3>i?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,n);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(l=(3>i?a(l):i>3?a(t,o,l):a(t,o))||l);return i>3&&l&&Object.defineProperty(t,o,l),l},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},core_1=require("@angular/core"),player_service_1=require("../services/player.service"),PlayerComponent=function(){function e(e){this._playerService=e,this.title="Deezer Challenge",this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0)}return e.prototype.ngOnInit=function(){console.log("in init"),DZ.init({appId:"180442",channelUrl:"http://sonard.herokuapp.com/",player:{container:"player",width:300,height:300,format:"square",onload:function(){}}}),DZ.getLoginStatus(function(e){console.log("status"),e.authResponse?console.log("logged in"):console.log("not logged in")}.bind(this))},e.prototype.login=function(){console.log("in login");DZ.login(function(e){"connected"==e.status?(console.log("Welcome!  Fetching your information.... "),DZ.api("/user/me",function(e){console.log("Good to see you, "+e.name+"."),this._playerService.createNewUser(e.id,e.name,e.picture_small)}.bind(this))):console.log("User cancelled login or did not fully authorize.")}.bind(this),{perms:"basic_access,email, manage_library, manage_community, listening_history, offline_access"})},e.prototype.createNewUser=function(e){},e.prototype.status=function(){DZ.getLoginStatus(function(e){console.log("status"),e.authResponse?console.log("logged in"):console.log("not logged in")})},e.prototype.myName=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}DZ.api("/user/me",function(e){console.log("My name",e.name)}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.logout=function(){DZ.logout()},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/todo.html",styleUrls:["player/styles/todo.css"],providers:[player_service_1.PlayerService]}),__metadata("design:paramtypes",[player_service_1.PlayerService])],e)}();exports.PlayerComponent=PlayerComponent;