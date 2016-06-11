"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var dashboard_component_1 = require("../../player/components/dashboard.component");
var adminCreateTeam_component_1 = require("./adminCreateTeam.component");
var AdminComponent = (function () {
    function AdminComponent(_parent, ref) {
        this._parent = _parent;
        this.ref = ref;
        this.leaderboardList = [];
        //this.allTeams = _parent.allTeams;
    }
    AdminComponent.prototype.ngOnInit = function () {
        console.log('nginit');
        console.log(this.allTeams);
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.ref.detach();
    };
    AdminComponent.prototype.removeTeam = function (team) {
        this._parent.getFirebase().database().ref('teams/' + team.id).remove();
    };
    AdminComponent.prototype.getFirebase = function () {
        return this._parent.getFirebase();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdminComponent.prototype, "allTeams", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin-cmp',
            templateUrl: 'admin/templates/admin-component.html',
            styleUrls: ['admin/styles/admin.css'],
            directives: [adminCreateTeam_component_1.AdminCreateTeam]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return dashboard_component_1.DashboardComponent; }))), 
        __metadata('design:paramtypes', [dashboard_component_1.DashboardComponent, core_1.ChangeDetectorRef])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
