import {Injectable} from "@angular/core";

declare var firebase: any;

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
  public createNewUser(id, name, picture_small){
    firebase.database().ref('users/' + id).set({
      username: name,
      picture: picture_small
    });
  }

  /**
   * Check to see if the user is in our user-base already
   * (and hence already assigned a team)
   * @param id
     */
  public checkReturningUser(id){
    firebase.database().ref('users/' + id).on('value', function(snapshot) {
      if(snapshot.val() === undefined){
        return false;
      }
      else{
        return true;
      }
    });
  }

}
