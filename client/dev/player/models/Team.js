"use strict";
/**
 * Created by kfraser on 09/06/2016.
 */
var Team = (function () {
    function Team(id, name, genres, members) {
        this.id = id;
        this.name = name;
        this.genres = genres;
        this.members = members;
    }
    return Team;
}());
exports.Team = Team;
