import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './../../core/models';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTitleState } from '../../store/title/title.selector';
import { setTitle } from '../../store/title/title.actions';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  authUser: Observable<User|null>;
  title$ : Observable<string>;
  constructor(private authService:AuthService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store){
    this.authUser = this.authService.authUser$;
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      if (data['title']) {
        this.store.dispatch(setTitle({ title: data['title'] }));
      }
    });  
    this.title$ = this.store.select(selectTitleState).pipe(map((state)=>state.title));
  }

  ngOnInit(): void {
    this.title$ = this.store.select(selectTitleState).pipe(map((state)=>state.title!='' ? ' - '+state.title : ''));
  }  
}
