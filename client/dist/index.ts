import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from '@angular/core';

import {PlayerComponent} from './player/components/player.component';

bootstrap(PlayerComponent, [HTTP_PROVIDERS, provide(Window, {useValue: window})]);
