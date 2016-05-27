"use strict";var __decorate=this&&this.__decorate||function(o,e,t,n){var a,i=arguments.length,l=3>i?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(o,e,t,n);else for(var c=o.length-1;c>=0;c--)(a=o[c])&&(l=(3>i?a(l):i>3?a(e,t,l):a(e,t))||l);return i>3&&l&&Object.defineProperty(e,t,l),l},__metadata=this&&this.__metadata||function(o,e){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(o,e):void 0},core_1=require("@angular/core"),TodoCmp=function(){function o(){this.title="Deezer Challenge",this.loggedIn=!1,this.changedTrack=!1,window.addEventListener("deviceorientation",function(o){console.log(o.alpha),console.log(o.beta),console.log(o.gamma),this.alpha=o.alpha,this.beta=o.beta,this.gamma=o.gamma,o.beta<-20&&0==this.changedTrack&&(this.nextTrack(),this.changedTrack=!0),o.beta>30&&(this.changedTrack=!1)}.bind(this),!0)}return o.prototype.ngOnInit=function(){console.log("in init"),DZ.init({appId:"180442",channelUrl:"http://sonard.herokuapp.com/",player:{container:"player",width:300,height:300,format:"square",onload:function(){}}})},o.prototype.login=function(){console.log("in login"),DZ.login(function(o){o.authResponse?(console.log("Welcome!  Fetching your information.... "),DZ.api("/user/me",function(o){console.log("Good to see you, "+o.name+"."),"undefined"!=o.name&&(this.loggedIn=!0)})):console.log("User cancelled login or did not fully authorize.")},{perms:"basic_access,email, manage_library, manage_community, listening_history, offline_access"})},o.prototype.status=function(){DZ.getLoginStatus(function(o){console.log("status"),o.authResponse?console.log("logged in"):console.log("not logged in")})},o.prototype.myName=function(){function o(o){console.log("Latitude: "+o.coords.latitude),console.log("Longitude: "+o.coords.longitude)}DZ.api("/user/me",function(o){console.log("My name",o.name)}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(o)},o.prototype.nextTrack=function(){DZ.player.next()},o.prototype.playMusic=function(){DZ.player.playPlaylist(1483340617)},o.prototype.logout=function(){DZ.logout()},o=__decorate([core_1.Component({selector:"todo-cmp",templateUrl:"todo/templates/todo.html",styleUrls:["todo/styles/todo.css"]}),__metadata("design:paramtypes",[])],o)}();exports.TodoCmp=TodoCmp;