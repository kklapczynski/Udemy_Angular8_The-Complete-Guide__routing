import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

interface Server {  // this interface should be in separate file
    id: number,
    name: string,
    status: string
}

@Injectable()   // cause we are injecting service into service
export class ServerResolver implements Resolve<Server> {
    constructor(private serverService: ServersService){}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Server> | Promise<Server> | Server {
        return this.serverService.getServer(parseInt(route.params['id']));  // here data required = server is instantly accesible, but reslove can be used to fetch something before loading the route
    }
}