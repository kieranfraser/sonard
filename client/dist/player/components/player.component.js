"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var n,a=arguments.length,i=3>a?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(i=(3>a?n(i):a>3?n(t,o,i):n(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},core_1=require("@angular/core"),player_service_1=require("../services/player.service"),landing_component_1=require("./landing.component"),about_component_1=require("./about.component"),dashboard_component_1=require("./dashboard.component"),router_1=require("@angular/router"),PlayerComponent=function(){function e(e,t){this._playerService=e,this.router=t,this.title="Deezer Challenge",this.numberUsersPerTeam=3}return e.prototype.ngOnInit=function(){firebase=this._playerService.getFirebaseDB(),this.router.navigate(["/"]),DZ.init({appId:"180442",channelUrl:"http://sonard.herokuapp.com/",player:{container:"player",width:300,height:300,format:"square",onload:function(){}}}),DZ.getLoginStatus(function(e){console.log("status"),e.authResponse&&this.router.navigate(["/dashboard"])}.bind(this))},e.prototype.login=function(){DZ.login(function(e){"connected"==e.status?DZ.api("/user/me",function(e){this.initUser(e)}.bind(this)):console.log("User cancelled login or did not fully authorize.")}.bind(this),{perms:"basic_access,email, manage_library, manage_community, listening_history, offline_access"})},e.prototype.myName=function(){DZ.api("/user/me",function(e){console.log("My name",e.name)})},e.prototype.logout=function(){DZ.logout(),this.router.navigate(["/"])},e.prototype.initUser=function(e){firebase.database().ref("users/"+e.id).on("value",function(t){"undefined"==typeof t.val()||null===t.val()?this.checkTeams(e):this.router.navigate(["/dashboard"])}.bind(this))},e.prototype.checkTeams=function(e){firebase.database().ref("teams").once("value").then(function(t){if("undefined"==typeof t.val())this._playerService.createNewTeamAndAddUser(e);else{var o=JSON.parse(JSON.stringify(t.val()));console.log(o);var r=Object.keys(o).length;for(var n in o){if(o.hasOwnProperty(n)){var a=JSON.parse(JSON.stringify(o[n])).members,i=Object.keys(a).length;if(console.log(i),i<this.numberUsersPerTeam){console.log("less than 3"),this._playerService.addUserToExistingTeam(e,n);break}1===r&&(console.log("last team"),this._playerService.createNewTeamAndAddUser(e))}r-=1}this.router.navigate(["/dashboard"])}}.bind(this))},e=__decorate([core_1.Component({selector:"player-cmp",templateUrl:"player/templates/todo.html",styleUrls:["player/styles/todo.css"],providers:[player_service_1.PlayerService],directives:[router_1.ROUTER_DIRECTIVES]}),router_1.Routes([{path:"/",component:landing_component_1.LandingComponent},{path:"/about",component:about_component_1.AboutComponent},{path:"/dashboard",component:dashboard_component_1.DashboardComponent}]),__metadata("design:paramtypes",[player_service_1.PlayerService,router_1.Router])],e)}();exports.PlayerComponent=PlayerComponent;