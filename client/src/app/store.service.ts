import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './ducks';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  get Store(): Store<AppState> {
    return this.store;
  }

  constructor(private store: Store<AppState>) { }

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  select<Res>(selector: (state: AppState) => Res): Observable<Res> {
    return this.store.pipe(
      select(selector),
    );
  }
}
