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
var common_1 = require('@angular/common');
var todo_service_1 = require('../services/todo-service');
var TodoCmp = (function () {
    function TodoCmp(fb, _todoService) {
        this._todoService = _todoService;
        this.title = "ng2do";
        this.todos = [];
        this.todoForm = fb.group({
            "todoMessage": ["", common_1.Validators.required]
        });
    }
    TodoCmp.prototype.ngOnInit = function () {
        console.log('in init');
        DZ.init({
            appId: '180442',
            channelUrl: 'http://sonard.herokuapp.com/'
        });
        this._getAll();
    };
    TodoCmp.prototype._getAll = function () {
        var _this = this;
        this._todoService
            .getAll()
            .subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodoCmp.prototype.add = function (message) {
        var _this = this;
        this._todoService
            .add(message)
            .subscribe(function (m) {
            _this.todos.push(m);
            _this.todoForm.controls['todoMessage'].updateValue("");
        });
    };
    TodoCmp.prototype.remove = function (id) {
        var _this = this;
        this._todoService
            .remove(id)
            .subscribe(function () {
            _this.todos.forEach(function (t, i) {
                if (t._id === id)
                    return _this.todos.splice(i, 1);
            });
        });
    };
    TodoCmp.prototype.login = function () {
        console.log('in login');
        DZ.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                DZ.api('/user/me', function (response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { perms: 'basic_access,email' });
    };
    TodoCmp.prototype.status = function () {
        DZ.getLoginStatus(function (response) {
            console.log('status');
            if (response.authResponse) {
                console.log('logged in');
            }
            else {
                // no user session available, someone you dont know
                console.log('not logged in');
            }
        });
    };
    TodoCmp.prototype.myName = function () {
        DZ.api('/user/me', function (response) {
            console.log("My name", response.name);
        });
    };
    TodoCmp = __decorate([
        core_1.Component({
            selector: 'todo-cmp',
            templateUrl: 'todo/templates/todo.html',
            styleUrls: ['todo/styles/todo.css'],
            providers: [todo_service_1.TodoService]
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(todo_service_1.TodoService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, todo_service_1.TodoService])
    ], TodoCmp);
    return TodoCmp;
}());
exports.TodoCmp = TodoCmp;
