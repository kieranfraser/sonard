import {Component, OnInit, forwardRef, Inject, ChangeDetectorRef, OnDestroy, Input} from '@angular/core';
import {DashboardComponent} from "../../player/components/dashboard.component";
import {Team} from "../../common/models/Team";
import {AdminCreateTeam} from "./adminCreateTeam.component";

declare var DZ: any;

@Component({
  selector: 'admin-cmp',
  templateUrl: 'admin/templates/admin-component.html',
  styleUrls: ['admin/styles/admin.css'],
  directives: [AdminCreateTeam]
})

export class AdminComponent implements OnInit, OnDestroy {

  leaderboardList = [];

  @Input() allTeams: Team[];
  allSongs = [];

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent,
              private ref: ChangeDetectorRef) {
    //this.allTeams = _parent.allTeams;
  }

  ngOnInit() {
      DZ.api('/playlist/1483340617/tracks', function(response){
        console.log("Name of user id 5", response);
        this.allSongs = response.data;
        console.log("allsongs", this.allSongs);
      }.bind(this));

  }

  ngOnDestroy(){
    this.ref.detach();
  }

  removeTeam(team){
    this._parent.getFirebase().database().ref('teams/'+team.id).remove();
  }

  getFirebase(){
    return this._parent.getFirebase();
  }

  setSong(track){
    this._parent.getFirebase().database().ref('currentTrack').set(track);
    DZ.player.addToQueue(track.id);
  }

}
