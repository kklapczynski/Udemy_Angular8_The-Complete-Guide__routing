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
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'], // snapshot ia done once, so user doesn't update when component is not reloaded e.g. when we change url programmatically
    }

    // need to use observable to update user data on url changes
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }

  // subscribtions generally should be removed when component destroyed (here - for route.params subscription Angular does it automatically)
  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
