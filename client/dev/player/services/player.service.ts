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
    localStorage.setItem('firebase', firebase);
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
   * Update the list of teams the user has participated in.
   * @param user
   * @param allocatedTeam
     */
  public updateExistingUser(user, allocatedTeam){
    firebase.database().ref('users/' + user.id+'/teams').push({
      team: allocatedTeam
    }).key;
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
  public createNewTeamAndAddUser(user, returning){

    var teamRef = firebase.database().ref('teams');

    var newTeamKey = teamRef.push({
      teamName: "create a team name"
    }).key;

    firebase.database().ref('teams/'+newTeamKey+'/members/'+user.id).set({
      member: true
    });
    if(returning){
      this.updateExistingUser(user, newTeamKey);
    }
    else{
      this.createNewUser(user.id, user.name, newTeamKey);
    }
  }

  public addUserToExistingTeam(user, teamKey, returning){

    firebase.database().ref('teams/'+teamKey+'/members/'+user.id).set({
      member: true
    });
    if(returning){
      this.updateExistingUser(user, teamKey);
    }
    else{
      this.createNewUser(user.id, user.name, teamKey);
    }
  }
}
