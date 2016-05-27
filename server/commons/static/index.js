"use strict";
var fs = require('fs');
var StaticDispatcher = (function () {
    function StaticDispatcher() {
    }
    StaticDispatcher.sendIndex = function (req, res) {
        var _root = process.cwd();
        res.type('.html');
        fs.createReadStream(_root + '/client/dev/index.html')
            .pipe(res);
    };
    StaticDispatcher.deezerChannel = function (req, res) {
        var _root = process.cwd();
        console.log("deezerChannel");
        res.type('.html');
        fs.createReadStream(_root + '/client/dev/deezerChannel.html')
            .pipe(res);
    };
    return StaticDispatcher;
}());
exports.StaticDispatcher = StaticDispatcher;
