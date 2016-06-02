"use strict";var __decorate=this&&this.__decorate||function(e,o,t,n){var a,i=arguments.length,r=3>i?o:null===n?n=Object.getOwnPropertyDescriptor(o,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,o,t,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(3>i?a(r):i>3?a(o,t,r):a(o,t))||r);return i>3&&r&&Object.defineProperty(o,t,r),r},__metadata=this&&this.__metadata||function(e,o){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,o):void 0},core_1=require("@angular/core"),player_service_1=require("../services/player.service"),PlayerComponent=function(){function e(e){this._playerService=e,this.title="Deezer Challenge",this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0)}return e.prototype.ngOnInit=function(){firebase=this._playerService.getFirebaseDB(),DZ.init({appId:"180442",channelUrl:"http://sonard.herokuapp.com/",player:{container:"player",width:300,height:300,format:"square",onload:function(){}}}),DZ.getLoginStatus(function(e){console.log("status"),e.authResponse?console.log("logged in"):console.log("not logged in")}.bind(this))},e.prototype.login=function(){DZ.login(function(e){"connected"==e.status?(console.log("Welcome!  Fetching your information.... "),DZ.api("/user/me",function(e){console.log("Good to see you, "+e.name+"."),this.initUser(e)}.bind(this))):console.log("User cancelled login or did not fully authorize.")}.bind(this),{perms:"basic_access,email, manage_library, manage_community, listening_history, offline_access"})},e.prototype.createNewUser=function(e){},e.prototype.status=function(){DZ.getLoginStatus(function(e){console.log("status"),e.authResponse?console.log("logged in"):console.log("not logged in")})},e.prototype.myName=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}DZ.api("/user/me",function(e){console.log("My name",e.name)}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.logout=function(){DZ.logout()},e.prototype.initUser=function(e){firebase.database().ref("users/"+e.id).on("value",function(o){"undefined"==typeof o.val()||null===o.val()?(console.log("new user"),this.checkTeams(e)):(console.log("returning user"),console.log(o.val()))}.bind(this))},e.prototype.checkTeams=function(e){firebase.database().ref("teams").on("value",function(o){if("undefined"==typeof o.val())console.log("all teams undefined"),this._playerService.createNewTeamAndAddUser(e);else{console.log("there are teams");var t=JSON.parse(JSON.stringify(o.val()));console.log(t);for(var n in t)if(t.hasOwnProperty(n)){console.log(JSON.parse(JSON.stringify(t[n]))),console.log(JSON.parse(JSON.stringify(t[n])).members);var a=JSON.parse(JSON.stringify(t[n])).members;console.log(Object.keys(a).length)}}}.bind(this))},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/todo.html",styleUrls:["player/styles/todo.css"],providers:[player_service_1.PlayerService]}),__metadata("design:paramtypes",[player_service_1.PlayerService])],e)}();exports.PlayerComponent=PlayerComponent;