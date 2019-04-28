import { ActionReducerMap } from '@ngrx/store';

import * as OfficePlan from './officePlan';
import * as Refreshments from './refreshments';

import OfficePlanEffects from './officePlan.effects';
import RefreshmentsEffects from './refreshments.effects';

export class AppState {
  [OfficePlan.statePath]: OfficePlan.State;
  [Refreshments.statePath]: Refreshments.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [OfficePlan.statePath]: OfficePlan.reducer,
  [Refreshments.statePath]: Refreshments.reducer,
};

export const effects = [
  OfficePlanEffects,
  RefreshmentsEffects,
];
