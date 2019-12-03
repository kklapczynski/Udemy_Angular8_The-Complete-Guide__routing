import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;
  // other guards didn't need access to component's properties, but here it needs to check changesSaved and be provided as a service in app-routin.module
  // to make this kind of guard reusable by any component, we need it to force component to have certain methods
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
        (qParams: Params) => {
          this.allowEdit = qParams['allowEdit'] === '1' ? true : false ;
        }
    );
    // this.route.fragment.subscribe();
    
    this.server = this.serversService.getServer(parseInt(this.route.snapshot.params['id']));
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) return true;
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Discard changes?');
    } else {
      return true;
    }
    // console.log('edit-server.component: canDeactivate()');
    // return false;
  }

}
