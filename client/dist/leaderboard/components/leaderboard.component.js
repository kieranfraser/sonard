"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var a,n=arguments.length,d=3>n?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,t,o,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(d=(3>n?a(d):n>3?a(t,o,d):a(t,o))||d);return n>3&&d&&Object.defineProperty(t,o,d),d},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},__param=this&&this.__param||function(e,t){return function(o,r){t(o,r,e)}},core_1=require("@angular/core"),dashboard_component_1=require("../../player/components/dashboard.component"),LeaderBoardComponent=function(){function e(e,t){this._parent=e,this.ref=t,this.leaderboardList=[],this.getFlow()}return e.prototype.ngOnInit=function(){this._parent.getFirebase().database().ref("singleLeaderboard").on("value",function(e){console.log(e.val()),this.leaderboardList=[],this.populateLeaderboard(e.val().leaderboard)}.bind(this))},e.prototype.populateLeaderboard=function(e){for(var t in e)console.log(t),console.log(e[t]),console.log(e[t].id),this._parent.getFirebase().database().ref("users/"+e[t].id).once("value").then(function(e,t,o){console.log(o.val());var r=o.val().username;this.leaderboardList.push({id:t[e].id,name:r,result:t[e].result}),console.log("leaderboard - unsorted"),console.log(this.leaderboardList),this.leaderboardList.sort(function(e,t){return t.result-e.result}),console.log("leaderboard - sorted"),console.log(this.leaderboardList),localStorage.setItem("leaderId",this.leaderboardList[0].id),this.ref.detectChanges()}.bind(this,t,e))},e.prototype.ngOnDestroy=function(){this.ref.detach()},e.prototype.getFlow=function(){var e=JSON.parse(localStorage.getItem("userD")).id;DZ.api("/user/"+e+"/flow",function(e){console.log("the flow",e);var t=e.data,o=Math.round(Math.random()*t.length)+1,r=t[o],a=r.album;console.log(a),this.coverImage_medium=a.cover_medium})},e=__decorate([core_1.Component({selector:"leaderboard-cmp",templateUrl:"leaderboard/templates/leaderboard-component.html",styleUrls:["leaderboard/styles/leaderboard.css"]}),__param(0,core_1.Inject(core_1.forwardRef(function(){return dashboard_component_1.DashboardComponent}))),__metadata("design:paramtypes",[dashboard_component_1.DashboardComponent,core_1.ChangeDetectorRef])],e)}();exports.LeaderBoardComponent=LeaderBoardComponent;