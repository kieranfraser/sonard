"use strict";var __decorate=this&&this.__decorate||function(e,t,o,a){var n,l=arguments.length,r=3>l?t:null===a?a=Object.getOwnPropertyDescriptor(t,o):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,a);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(r=(3>l?n(r):l>3?n(t,o,r):n(t,o))||r);return l>3&&r&&Object.defineProperty(t,o,r),r},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},core_1=require("@angular/core"),DashboardComponent=function(){function e(){this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0),console.log("nginit dashboard"),firebase=localStorage.getItem("firebase"),this.initTeams()}return e.prototype.ngOnInit=function(){},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.geolocation=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.getTeamList=function(){},e.prototype.initTeams=function(){var e=localStorage.getItem("user");console.log(e),firebase.database().ref("users/"+e.id).on("value",function(e){console.log(e.val().team),console.log(e.val()),localStorage.setItem("team",e.val().team),console.log("finally"),console.log(localStorage.getItem("team")),console.log(localStorage.getItem("user"))}.bind(this))},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/todo.css"]}),__metadata("design:paramtypes",[])],e)}();exports.DashboardComponent=DashboardComponent;