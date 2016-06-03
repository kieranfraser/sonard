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
  public createNewUser(id, name, allocatedTeam){
    firebase.database().ref('users/' + id).set({
      username: name,
      team: allocatedTeam
    });
  }

  /**
   * Get the firebase database
   * @returns {any}
     */
  public getFirebaseDB(){
    return firebase;
  }

  /**
   * Create a new team and add the team to the user
   * @param id - of the user
   */
  public createNewTeamAndAddUser(user){

    var teamRef = firebase.database().ref('teams');

    var newTeamKey = teamRef.push({
      teamName: "create a team name"
    }).key;

    firebase.database().ref('teams/'+newTeamKey+'/members/'+user.id).set({
      member: true
    });
    this.createNewUser(user.id, user.name, newTeamKey);
  }

  public addUserToExistingTeam(user, teamKey){

    firebase.database().ref('teams/'+teamKey+'/members/'+user.id).set({
      member: true
    });

    this.createNewUser(user.id, user.name, teamKey);
  }
}
