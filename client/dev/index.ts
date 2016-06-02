import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';

import {PlayerComponent} from './player/components/player.component';

bootstrap(PlayerComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(Window, {useValue: window})]);
