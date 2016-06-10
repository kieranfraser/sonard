"use strict";var __decorate=this&&this.__decorate||function(e,t,a,o){var n,r=arguments.length,s=3>r?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,o);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(s=(3>r?n(s):r>3?n(t,a,s):n(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},__param=this&&this.__param||function(e,t){return function(a,o){t(a,o,e)}},core_1=require("@angular/core"),common_1=require("@angular/common"),player_component_1=require("./player.component"),Team_1=require("../models/Team"),adminCreateTeam_component_1=require("./adminCreateTeam.component"),DashboardComponent=function(){function e(e,t){this._parent=e,this.ref=t,this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,this.teamAssigned=!1,this.admin=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0),console.log("constructor dashboard")}return e.prototype.ngOnInit=function(){console.log("actual init");var e=JSON.parse(localStorage.getItem("userF")).teamAssigned;if(console.log(e),"undefined"!=typeof e&&null!=e){this.teamAssigned=!0;var t=[];this._parent.getFirebase().database().ref("teams/"+e).on("value",function(a){console.log(a.val());for(var o in a.val().members)a.val().members.hasOwnProperty(o)&&(t.push(o),console.log(o));var n=new Team_1.Team(e,a.val().name,a.val().genres,[]);localStorage.setItem("team",JSON.stringify(n))})}this.getTeams(),"Kieran.Fraser"===localStorage.getItem("userD").name&&(console.log("entered admin mode"),this.admin=!0)},e.prototype.getFirebase=function(){return this._parent.getFirebase()},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.geolocation=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.initTeams=function(){var e=localStorage.getItem("userD");console.log(JSON.parse(e).id),this._parent.getFirebase().database().ref("users/"+JSON.parse(e).id).on("value",function(e){localStorage.setItem("team",e.val().currentTeam),this.getTeamList()}.bind(this))},e.prototype.getTeamList=function(){console.log("get team list");var e=[];this._parent.getFirebase().database().ref("teams/"+localStorage.getItem("team")).on("value",function(t){var a=JSON.parse(JSON.stringify(t.val().members)),o=JSON.parse(JSON.stringify(t.val().teamName));console.log(o);for(var n in a)a.hasOwnProperty(n)&&(console.log(n),e.push(n));this.populateTeamList(e)}.bind(this))},e.prototype.populateTeamList=function(e){this.teamList=[];for(var t=1,a=0,o=e;a<o.length;a++){var n=o[a];firebase.database().ref("users/"+n).on("value",function(a){this.teamList.push(a.val().username),console.log(Object.keys(e).length),console.log(t),t===Object.keys(e).length,t++}.bind(this))}},e.prototype.getTeams=function(){this._parent.getFirebase().database().ref("teams").on("value",function(e){this.allTeams=[];for(var t in e.val()){var a=e.val()[t];this.allTeams.push(new Team_1.Team(t,a.teamName,a.genres,[]))}this.ref.detectChanges()}.bind(this))},e.prototype.removeTeam=function(e){this._parent.getFirebase().database().ref("teams/"+e.id).remove()},e.prototype.selectedTeam=function(e){var t=JSON.parse(localStorage.getItem("userD")).id;this._parent.getFirebase().database().ref("teams/"+e.id+"/members/"+t).set({member:!0}),this._parent.getFirebase().database().ref("users/"+t).update({teamAssigned:e.id}),localStorage.setItem("team",e),this.teamAssigned=!0},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/dashboard.css"],directives:[common_1.CORE_DIRECTIVES,adminCreateTeam_component_1.AdminCreateTeam]}),__param(0,core_1.Inject(core_1.forwardRef(function(){return player_component_1.PlayerComponent}))),__metadata("design:paramtypes",[player_component_1.PlayerComponent,core_1.ChangeDetectorRef])],e)}();exports.DashboardComponent=DashboardComponent;