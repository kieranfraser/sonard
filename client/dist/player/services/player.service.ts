declare var firebase: any;
import {Injectable} from "@angular/core";

@Injectable()
export class PlayerService {

  //ToDo: These keys need to be moved to server side
  constructor() {
    var config = {
      apiKey: "AIzaSyA1E0hp_78RcMgHWj7Vpbg6AkHzT2hZfto",
      authDomain: "sonar-11442.firebaseapp.com",
      databaseURL: "https://sonar-11442.firebaseio.com",
      storageBucket: "sonar-11442.appspot.com",
    };
    firebase.initializeApp(config);
  }

  /**
   * Create a new user (on first log-in with deezer account
   * @param value
   */
  createNewUser(user){
    console.log(user.name);
    console.log(user.id);
    console.log(user.gender);
    firebase.database().ref('users/' + user.id).set({
      username: user.name,
      gender: user.gender
    });

  }
}
