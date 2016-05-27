import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from '@angular/common';

import {
  TodoService
} from '../services/todo-service';

type Todo = {
  todoMessage: string;
  _id: string;
}

declare var DZ: any;

@Component({
  selector: 'todo-cmp',
  templateUrl: 'todo/templates/todo.html',
  styleUrls: ['todo/styles/todo.css'],
  providers: [TodoService]
})
export class TodoCmp implements OnInit {
  title: string = "ng2do";
  todos: Todo[] = [];
  todoForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(TodoService) private _todoService: TodoService) {
    this.todoForm = fb.group({
      "todoMessage": ["", Validators.required]
    });
  }

  ngOnInit() {
    console.log('in init');
    DZ.init({
      appId  : '180442',
      channelUrl : 'http://sonard.herokuapp.com/'
    });

    this._getAll();
  }

  private _getAll():void {
    this._todoService
        .getAll()
        .subscribe((todos) => {
          this.todos = todos;
        });
  }

  add(message:string):void {
    this._todoService
        .add(message)
        .subscribe((m) => {
          this.todos.push(m);
          (<Control>this.todoForm.controls['todoMessage']).updateValue("");
        });
  }

  remove(id:string):void {
    this._todoService
      .remove(id)
      .subscribe(() => {
        this.todos.forEach((t, i) => {
          if (t._id === id)
            return this.todos.splice(i, 1);
        });
      })
  }

  login(){
    console.log('in login');
    DZ.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        DZ.api('/user/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {perms: 'basic_access,email'});
  }

  status(){
    DZ.getLoginStatus(function(response) {
      console.log('status');
      if (response.authResponse) {
        console.log('logged in');
        // logged in and connected user, someone you know
      } else {
        // no user session available, someone you dont know
        console.log('not logged in');
      }
    });
  }

  myName(){
    DZ.api('/user/me', function(response){
      console.log("My name", response.name);
    });
  }
}
