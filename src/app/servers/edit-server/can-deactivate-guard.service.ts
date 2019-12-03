import { Observable } from "rxjs";
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

// to make this kind of guard reusable by any component, we need it to force component to have certain methods

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {  
    // implementing CanDeactivate interface with component of type CanComponentDeactivate means this guard can be used only on components that implement CanComponentDeactivate interface
    // which ensures that this component has canDeactivate method returning boolean (straight away or as result of Observable or Promise)

    canDeactivate(                          // this canDeactivate() method will be called by the angular router once we try to leave the route
        component: CanComponentDeactivate,  // component that guard is tied to in app-routing.module
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {   // "?" marks optional argument
    
        return component.canDeactivate();   // with this angular router calls component's canDeactivate() method - if it returns true, navigation is allowed and follows
                                            // this ties component's canDeactivate method with the router - CanDeactivateGuard service introduced in app-routing.module.ts uses canDeactivate() method defined in component
                                            // mechanism of navigating is in Guard + Router, but logic for stoping navigation is in component
    }
}