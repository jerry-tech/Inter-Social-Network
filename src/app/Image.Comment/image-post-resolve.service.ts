import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Iimage, IimageResolved } from '../Users/image';
import { Observable, of } from 'rxjs';
import { DataService } from '../Users/data.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagePostResolve implements Resolve<IimageResolved>{

  constructor(private dataService: DataService){ }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<IimageResolved>{
    const id = route.paramMap.get('id');
    if(isNaN(+id)){
      const message = `Image Article ID was not a number : ${id}`;
      console.error(message);
      return of({image: null, error: message});
    }
    return this.dataService.getImageArticleById(+id).pipe(
      map(image => ({image: image})),
      catchError(error => {
        const message = `Retrival error: ${error}`;
        console.error(message);
        return of({image: null, error:message});
      })
    )
  }
}
