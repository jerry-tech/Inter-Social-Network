import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminComponent } from './admin.component';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanDeactivate<AdminComponent> {
  canDeactivate(component: AdminComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean  {
    if(component.adminRegister.dirty){
      const AdminForm = component.adminRegister.value;
      return confirm('Navigation away from registration form will cause a loss in form data');
    }
    return true;
  }
 
}
