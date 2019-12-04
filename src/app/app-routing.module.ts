import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorComponent } from "./error/error.component";
import { ServerResolver } from "./servers/server/server-resolver.service";


const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }, // 'id' custom specified name, that can be retrieved inside component; ':' marks that this is dynamic part of path
    ] },
    { path: 'servers', 
      // canActivate: [AuthGuard], // AuthGuard works for servers path and all its children
      canActivateChild: [AuthGuard],  // AuthGuard works for servers children paths only
      component: ServersComponent, 
      children: [
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} }, // resolver works before component is loaded and stores in this case <Server> in data['server'] - the same data object as used for static data below
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] } // CanDeactivateGuard implements CanDeactivate interface to decide if a route can be deactivated - navigated away from
      ] 
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorComponent, data: {message: 'Error: page not found!!!'} },  // static data passed by router - to use in component; e.g. use 1 component with different paths and individual data
    { path: '**', redirectTo: '/not-found' }  // wild card must be at the end of paths list, otherwise will always load
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}