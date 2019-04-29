import { ActionReducerMap } from '@ngrx/store';

import * as OfficePlan from './officePlan';
import * as Refreshments from './refreshments';

import { Effects as OfficePlanEffects } from './officePlan.effects';
import { Effects as RefreshmentsEffects } from './refreshments.effects';

export class AppState {
  [OfficePlan.statePath]: OfficePlan.State;
  [Refreshments.statePath]: Refreshments.State;
}

export const reducers: ActionReducerMap<AppState> = {
  officePlan: OfficePlan.reducer,
  refreshments: Refreshments.reducer,
};

export const effects = [
  OfficePlanEffects,
  RefreshmentsEffects,
];
