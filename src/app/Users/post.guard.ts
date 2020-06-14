import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PostComponent } from './post.component';

@Injectable({
  providedIn: 'root'
})
export class PostGuard implements CanDeactivate<PostComponent> {

  canDeactivate(component: PostComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(component.imageForm.dirty){
      return confirm('A navigation away from Image Post form will cause a loss in form data');
    }
    return true;
  }

  
}
