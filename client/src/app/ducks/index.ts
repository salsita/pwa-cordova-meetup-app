import { ActionReducerMap } from '@ngrx/store';

import * as OfficePlan from './officePlan';

import OfficePlanEffects from './officePlan.effects';

export class AppState {
  [OfficePlan.statePath]: OfficePlan.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [OfficePlan.statePath]: OfficePlan.reducer,
};

export const effects = [
  OfficePlanEffects,
];
