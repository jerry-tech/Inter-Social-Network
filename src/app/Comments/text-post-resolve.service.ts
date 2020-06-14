import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { DataService } from '../Users/data.service';
import { catchError, map } from 'rxjs/operators';
import { Article, ArticleResolved } from '../Users/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlePostResolve implements Resolve<ArticleResolved>{

  constructor(private dataService: DataService){ }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<ArticleResolved>{
    const id = route.paramMap.get('id');
    if(isNaN(+id)){
      const message = `Article ID was not a number : ${id}`;
      console.error(message);
      return of({article: null, error: message});
    }
    return this.dataService.getArticleById(+id).pipe(
      map(article => ({article: article})),
      catchError(error => {
        const message = `Retrival error: ${error}`;
        console.error(message);
        return of({article: null, error:message});
      })
    )
  }
}
