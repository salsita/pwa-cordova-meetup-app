import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs/operators';

import { Actions as OfficePlanActions, ActionType, TakePath, PathEnded } from './officePlan';

@Injectable()
export class Effects {
  @Effect()
  readonly tryPath = this.action$.pipe(
    ofType(OfficePlanActions.TakePath),
    delay(3000),
    map((action: TakePath) => new PathEnded(action.pathNumber === 3)),
  );

  constructor(private readonly action$: Actions<ActionType>) {}
}
