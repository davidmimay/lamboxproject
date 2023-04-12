import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';
import { tap, map, take } from 'rxjs/operators';
// import { SnackService } from '../services/snack.service';

@Injectable({providedIn: 'root'})

export class RoleGuard implements CanActivate {

  constructor(
    private role: RoleService,
    private router: Router,
    // private snack: SnackService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.role.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        // if (!isAdmin) { this.snack.adminError()}
      })
    );
  }
}

@Injectable()
export class CanReadGuard implements CanActivate {

  constructor(private role: RoleService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.role.user$.pipe(
      take(1),
      map(user => user && this.role.canRead(user) ? true : false), // <-- important line
      tap(canView => {
        if (!canView) {
          console.error('Access denied. Must have permission to view content')
        }
      })
    );
  }
}