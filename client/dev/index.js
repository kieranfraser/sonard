"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var player_component_1 = require('./player/components/player.component');
platform_browser_dynamic_1.bootstrap(player_component_1.PlayerComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, core_1.provide(Window, { useValue: window })]);
