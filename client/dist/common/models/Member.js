/**
 * Created by kfraser on 09/06/2016.
 */
"use strict";
var Member = (function () {
    function Member(id, name, currentTeam) {
        this.id = id;
        this.name = name;
        this.currentTeam = currentTeam;
    }
    return Member;
}());
exports.Member = Member;
