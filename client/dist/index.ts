import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from '@angular/core';

import {TodoCmp} from './todo/components/todo-cmp';

bootstrap(TodoCmp, [HTTP_PROVIDERS, provide(Window, {useValue: window})]);
