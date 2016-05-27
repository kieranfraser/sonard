"use strict";

import * as mongoose from 'mongoose';
var dbConst = require('../constants/db.json');

var firebase = require("firebase");

export class DBConfig {
    static init():void {
      const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGOLAB_URI : dbConst.localhost;

      mongoose.connect(URL);
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));

      firebase.initializeApp({
        serviceAccount: "./sonar-17529750f7d9.json",
        databaseURL: "https://sonar-11442.firebaseio.com/"
      });

      var db = firebase.database();
      var ref = db.ref("server/saving-data/fireblog");

      var usersRef = ref.child("users");
      usersRef.set({
        alanisawesome: {
          date_of_birth: "June 23, 1912",
          full_name: "Alan Turing"
        },
        gracehop: {
          date_of_birth: "December 9, 1906",
          full_name: "Grace Hopper"
        }
      });
    }
};
