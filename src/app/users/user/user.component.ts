import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  routeParamsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.user = {
    //   id: this.route.snapshot.params['id'],
    //   name: this.route.snapshot.params['name'], // snapshot is done once, so user doesn't update when component is not reloaded e.g. when we change url programmatically
    // }
    // user must be initialized (assigned a value) to be able to set its properties via subscribe
    // it can be done with 'default' values or with this.route.snapshot.params[] as above
    this.user = {id: 0, name: ''};
    // need to use observable to update user data on url changes
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = parseInt(params['id']);  // a property cannot be undefined to set its value via subscribe
        this.user.name = params['name'];
      }
    )
  }

  // subscribtions generally should be removed when component destroyed (here - for route.params subscription Angular does it automatically)
  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
