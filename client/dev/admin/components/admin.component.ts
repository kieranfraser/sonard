import {Component, OnInit, forwardRef, Inject, ChangeDetectorRef, OnDestroy, Input} from '@angular/core';
import {DashboardComponent} from "../../player/components/dashboard.component";
import {Team} from "../../common/models/Team";
import {AdminCreateTeam} from "./adminCreateTeam.component";

@Component({
  selector: 'admin-cmp',
  templateUrl: 'admin/templates/admin-component.html',
  styleUrls: ['admin/styles/admin.css'],
  directives: [AdminCreateTeam]
})

export class AdminComponent implements OnInit, OnDestroy {

  leaderboardList = [];

  @Input('allTeams') allTeams: Team[];

  constructor(@Inject(forwardRef(() => DashboardComponent)) private _parent:DashboardComponent,
              private ref: ChangeDetectorRef) {
    //this.allTeams = _parent.allTeams;
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.ref.detach();
  }

  removeTeam(team){
    this._parent.getFirebase().database().ref('teams/'+team.id).remove();
  }

  getFirebase(){
    return this._parent.getFirebase();
  }

}
