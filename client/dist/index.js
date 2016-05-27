"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var todo_cmp_1 = require('./todo/components/todo-cmp');
platform_browser_dynamic_1.bootstrap(todo_cmp_1.TodoCmp, [http_1.HTTP_PROVIDERS]);
