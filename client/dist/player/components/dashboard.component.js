"use strict";var __decorate=this&&this.__decorate||function(e,t,a,o){var n,r=arguments.length,s=3>r?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,o);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(s=(3>r?n(s):r>3?n(t,a,s):n(t,a))||s);return r>3&&s&&Object.defineProperty(t,a,s),s},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},__param=this&&this.__param||function(e,t){return function(a,o){t(a,o,e)}},core_1=require("@angular/core"),common_1=require("@angular/common"),player_component_1=require("./player.component"),Team_1=require("../../common/models/Team"),leaderboard_component_1=require("../../leaderboard/components/leaderboard.component"),admin_component_1=require("../../admin/components/admin.component"),adminCreateTeam_component_1=require("../../admin/components/adminCreateTeam.component"),DashboardComponent=function(){function e(e,t){this._parent=e,this.ref=t,this.input="nothing",this.aresponse="nothing",this.changedTrack=!1,this.teamAssigned=!1,this.admin=!1,window.addEventListener("deviceorientation",function(e){console.log(e.alpha),console.log(e.beta),console.log(e.gamma),this.alpha=e.alpha,this.beta=e.beta,this.gamma=e.gamma,e.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),e.beta>30&&(this.changedTrack=!1)}.bind(this),!0),console.log("constructor dashboard")}return e.prototype.ngOnInit=function(){console.log("actual init"),this.currentTrack(),this.teamAssigned=!1;var e=JSON.parse(localStorage.getItem("userF")).teamAssigned;"undefined"!=typeof e&&null!=e&&(this.teamAssigned=!0,this._parent.getFirebase().database().ref("teams/"+e).on("value",function(t){this.teamList=[];for(var a in t.val().members)t.val().members.hasOwnProperty(a)&&this.teamList.push(t.val().members[a].name);new Team_1.Team(e,t.val().name,t.val().genres,this.teamList);localStorage.setItem("teamId",e)}.bind(this))),this.getTeams(),"Kieran.Fraser"===JSON.parse(localStorage.getItem("userD")).name&&(console.log("entered admin mode"),this.admin=!0,this.subscribeTrackPosition());var t=JSON.parse(localStorage.getItem("userD")).id;this._parent.getFirebase().database().ref("results/"+t).on("value",function(e){console.log(e.val())})},e.prototype.getFirebase=function(){return this._parent.getFirebase()},e.prototype.nextTrack=function(){DZ.player.next()},e.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},e.prototype.play=function(){DZ.player.play()},e.prototype.currentTrack=function(){this._parent.getFirebase().database().ref("currentTrack").on("value",function(e){DZ.player.addToQueue([e.val().id]),localStorage.setItem("currentTrack",JSON.stringify(e.val())),console.log("track added",e.val().title)}.bind(this))},e.prototype.subscribeTrackPosition=function(){DZ.Event.subscribe("player_position",function(e){console.log(e)})},e.prototype.geolocation=function(){function e(e){console.log("Latitude: "+e.coords.latitude),console.log("Longitude: "+e.coords.longitude)}navigator.geolocation&&navigator.geolocation.getCurrentPosition(e)},e.prototype.getTeams=function(){this._parent.getFirebase().database().ref("teams").on("value",function(e){this.allTeams=[];for(var t in e.val()){var a=e.val()[t],o=e.val()[t].members,n=[];for(var r in o)n.push(o[r].name);this.allTeams.push(new Team_1.Team(t,a.teamName,a.genres,n))}this.ref.detectChanges()}.bind(this))},e.prototype.ngOnDestroy=function(){console.log("destroy"),this.ref.detach()},e.prototype.selectedTeam=function(e){var t=JSON.parse(localStorage.getItem("userD")).id;this._parent.getFirebase().database().ref("teams/"+e.id+"/members/"+t).set({name:JSON.parse(localStorage.getItem("userD")).name}),this._parent.getFirebase().database().ref("users/"+t).update({teamAssigned:e.id});new Team_1.Team(e.id,e.name,e.genres,e.members);localStorage.setItem("teamId",e.id),this.teamList=[];for(var a=0,o=e.members;a<o.length;a++){var n=o[a];console.log(n),this.teamList.push(n)}this.teamList.push(JSON.parse(localStorage.getItem("userD")).name),this.teamAssigned=!0},e.prototype.result=function(){var e=Math.floor(6*Math.random())+1,t=JSON.parse(localStorage.getItem("userD")).id;this._parent.getFirebase().database().ref("results/"+t).push({result:e}),console.log(e)},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/dashboard.html",styleUrls:["player/styles/dashboard.css"],directives:[common_1.CORE_DIRECTIVES,adminCreateTeam_component_1.AdminCreateTeam,leaderboard_component_1.LeaderBoardComponent,admin_component_1.AdminComponent]}),__param(0,core_1.Inject(core_1.forwardRef(function(){return player_component_1.PlayerComponent}))),__metadata("design:paramtypes",[player_component_1.PlayerComponent,core_1.ChangeDetectorRef])],e)}();exports.DashboardComponent=DashboardComponent;