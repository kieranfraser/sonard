"use strict";var __decorate=this&&this.__decorate||function(e,t,a,n){var r,o=arguments.length,i=3>o?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var m=e.length-1;m>=0;m--)(r=e[m])&&(i=(3>o?r(i):o>3?r(t,a,i):r(t,a))||i);return o>3&&i&&Object.defineProperty(t,a,i),i},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},__param=this&&this.__param||function(e,t){return function(a,n){t(a,n,e)}},core_1=require("@angular/core"),Team_1=require("../../common/models/Team"),admin_component_1=require("./admin.component"),AdminCreateTeam=function(){function e(e){this._parent=e,this.teamModel=new Team_1.Team("","","",[]),this.submitted=!1,this.firebase=this._parent.getFirebase()}return e.prototype.ngOnInit=function(){},e.prototype.onSubmit=function(){this.submitted=!0;var e=this.firebase.database().ref("teams");e.push({teamName:this.teamModel.name,genres:this.teamModel.genres}).key},e=__decorate([core_1.Component({selector:"create-team",templateUrl:"player/templates/create-team.html",styleUrls:["player/styles/todo.css"]}),__param(0,core_1.Inject(core_1.forwardRef(function(){return admin_component_1.AdminComponent}))),__metadata("design:paramtypes",[admin_component_1.AdminComponent])],e)}();exports.AdminCreateTeam=AdminCreateTeam;