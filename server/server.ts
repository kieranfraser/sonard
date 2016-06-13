/// <reference path="../typings/index.d.ts" />

'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as http from 'http';
import {RoutesConfig} from './config/routes.conf';
import {DBConfig} from './config/db.conf';
import {Routes} from './routes/index';
import {StaticDispatcher} from './commons/static/index';

const app = express();

RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());

//app.use('/deezerChannel', routerDeezer);

var firebase = require("firebase");

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: "https://sonar-11442.firebaseio.com",
  serviceAccount: {
    project_id: "sonar-11442",
    client_email: "sonard@sonar-11442.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCpTPEIXf8AqW18\nL2LgAD5BeoZI6YINegtZyi2xkvOy/xzaZN+C2D23GWptbu189sNgDHf2KjCEkyqY\nP3PE/tdUVhuV5nFJFOShAl2ounKeQyORBz+4A7qf1ncYVxdknT+Az8nFjMD8HgOo\nnxsqA/4NY/dSVZoOKUAi7kyc9EgNQZz1bOIDExdQKsm5rKRMk7RRyBurLIgQcFoQ\nyA2M4vIZVI+KQXMSPnFZXQXN++baab3RWmNNDK2iwrdEOGbSaTwEW5Lu5ueH+QhE\nDn0GlTsSzmD1yhBDrxJEic+DVSdesDvqC5I2a8b8p3Fkx+Epd/lQZa3BJjwquusL\nqDNhAZtrAgMBAAECggEBAJGzyBSdYKLfLXydA4kobGvJ2NvTKrwSdsZVu7GBeP5p\nlBlYiwt+ss5rry5zMyxC6q40zOEsOgk+5n+UzDuT3xmT6bW+V2y/8GupL5XQsGgH\n/AoKpQnnG6wH1QM7oMRUmJxxN4Muub/AzQFHvQcR3IkFqYpQZX8efTYSxBioG4Jb\nt6fi2lhrLPpEQNNHc7kdOAAUeYTdXTm4avF3q0TqatTKGVP4jSihw5UyBGlxIpUi\nEljWhhkN4pcNK0D7kgyOr9LPYrN4aEDEE8cC4hXb4IsCMtH/3jSVPC2+TOpuIB8W\nKGtYn6q+xddoSpqRo6ww+hhAgjox28NEF9D9kqvC+4ECgYEA5HjBWOhiWhNMuRyp\nrRl4h3fanL0lQh2QVU0s1n2yNv9TmEijw7Vph1DH72vZ5qNUAc8ry07KugVYQ+ft\nAf6vyaEMC/t6n61bqylE+LjUSI6H7Sl89jfIomwSINLhaFS0kmcFmRGFHZSw9tRD\njzWNc3EyBP0L78CnufqM62d4pUsCgYEAvbMLCnlIOK3C2FMeL2D/qiwIhZ0tsIsL\nyclucMgfXcurC4IhtLHnVPSPDXQN4nK9kwAeDxp/lzxuTFW38LIPnE1KsOLL86Ta\n6HE40o8j9wiK+wlfbb2ig58V0mXIjCvSy+/JmhqDnxfQtNk1vhZIA0ZNsR+WWrvd\nmeQey7aWrmECgYEAnIrAr5JKET24C/2/pIMXOnq8pzhSFwL6qfe/CRgGy/gV5vme\ne7IJJFYNJ9bV7llqbfLtJthNvzd6SszWb8950sUt4+fjFRVLAfO89k5t5WkDaVRL\n8sg2CFPT9/mFyF6Beu5rv31pn+MJfZXi1HT0/mxIwXJAg32VbrBlbcXvvBECgYEA\nmAVry7D2F7Xod8PkZMOvH4i6K5mSi/BiOgua3fcCbABTyp02tb/8SzDRk0518gtR\nsQRfEmuB5IkhOztWdSW9LN0kBi06lL6AT9asWtErWUUXW6ZfO2rFWgWbT0kSNoLI\nI3a+cSjeYhiLwOJxFyxz+WvVxyQxMfVr2W/e3hItHwECgYA6Jadx7H6ASqu6Ke9N\n2ooEqylCBvbVdZaD/7zZp4wACJqh/ZysiJj6tTW7CwLY8DoDzefuDdOWGk25N3Qn\nVoErr2nSs2LmRHvvyXUVh62d9pqAQlai/ry1mm2AbwZiw/Ncu+2NaqucJKztd+UP\nq9f59ZPi6q/K/uEbs7+EcgWf6A==\n-----END PRIVATE KEY-----\n"
  }
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("results");



ref.on("value", function(snapshot) {
  var allResults = [];
  console.log(snapshot.val());

  // Calculate the individual leaderboard
  var members = snapshot.val();
  for(var member in members){
    var resultList = members[member];
    var totalResult = 0;
    for(var result in resultList){
      totalResult = totalResult + resultList[result].result;
    }
    allResults.push({id: member, result: totalResult});
  }
  allResults.sort(function(a,b){return b.member - a.member});

  db.ref('singleLeaderboard').set({
    track: 'randomSong',
    date: new Date().getTime(),
    leaderboard: allResults
  });


});

// ----------------------------- For python analysis --------------------------

let _root = process.cwd();

console.log('here');
var spawn = require('child_process').spawn, py = spawn('python', [_root + '/server/analysis/compute_input.py']),
  data = [1,2,3,4,5,6,7,8,9], dataString = '';

py.stdout.on('data', function(data){
  console.log('inside stdout', data);
  dataString += data.toString();
});
py.stdout.on('end', function(){
  console.log('Sum of numbers=',dataString);
  db.ref('python').set({
    result: dataString
  });  
});
py.stdin.write(JSON.stringify(data));
py.stdin.end();

// ----------------------------- End python analysis --------------------------

http.createServer(app)
    .listen(PORT, () => {
      console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
      console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
