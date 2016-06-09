"use strict";var __decorate=this&&this.__decorate||function(e,t,o,a){var n,r=arguments.length,i=3>r?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,a);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(i=(3>r?n(i):r>3?n(t,o,i):n(t,o))||i);return r>3&&i&&Object.defineProperty(t,o,i),i},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},__param=this&&this.__param||function(e,t){return function(o,a){t(o,a,e)}},core_1=require("@angular/core"),common_1=require("@angular/common"),player_component_1=require("./player.component"),DashboardComponent=function(){function e(e){this._parent=e,this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,this.me="",window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0),console.log("constructor dashboard")}return e.prototype.ngOnInit=function(){console.log("actual init"),this.me=JSON.parse(localStorage.getItem("user")).name},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.geolocation=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.initTeams=function(){var e=localStorage.getItem("user");console.log(JSON.parse(e).id),this._parent.getFirebase().database().ref("users/"+JSON.parse(e).id).on("value",function(e){localStorage.setItem("team",e.val().currentTeam),this.getTeamList()}.bind(this))},e.prototype.getTeamList=function(){console.log("get team list");var e=[];this._parent.getFirebase().database().ref("teams/"+localStorage.getItem("team")).on("value",function(t){var o=JSON.parse(JSON.stringify(t.val().members)),a=JSON.parse(JSON.stringify(t.val().teamName));console.log(a);for(var n in o)o.hasOwnProperty(n)&&(console.log(n),e.push(n));this.populateTeamList(e)}.bind(this))},e.prototype.populateTeamList=function(e){this.teamList=[];for(var t=1,o=0,a=e;o<a.length;o++){var n=a[o];firebase.database().ref("users/"+n).on("value",function(o){this.teamList.push(o.val().username),console.log(Object.keys(e).length),console.log(t),t===Object.keys(e).length,t++}.bind(this))}},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/todo.css"],directives:[common_1.CORE_DIRECTIVES]}),__param(0,core_1.Inject(core_1.forwardRef(function(){return player_component_1.PlayerComponent}))),__metadata("design:paramtypes",[player_component_1.PlayerComponent])],e)}();exports.DashboardComponent=DashboardComponent;