import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

export enum Actions {
  TakePath = '@@officePlan/TAKE_PATH',
  PathEnded = '@@officePlan/PATH_ENDED',
  ClearResult = '@@officePlan/CLEAR_RESULT',
}

export type ActionType =
  | TakePath
  | PathEnded
  | ClearResult;

export class TakePath implements Action {
  readonly type = Actions.TakePath;
  constructor(readonly pathNumber: number) {}
}

export class PathEnded implements Action {
  readonly type = Actions.PathEnded;
  constructor(readonly escaped: boolean) {}
}

export class ClearResult implements Action {
  readonly type = Actions.ClearResult;
}

export const statePath = 'officePlan';

export class State {
  tryingToEscape = false;
  result: boolean = null;
}

export function reducer(state: State = new State(), action: ActionType): State {
  switch (action.type) {
    case Actions.TakePath:
      return { ...state, tryingToEscape: true, result: null };
    case Actions.PathEnded:
      return { ...state, tryingToEscape: false, result: action.escaped };
    case Actions.ClearResult:
      return { ...state, result: null };
    default:
      return state;
  }
}

const selectState = createFeatureSelector<State>(statePath);

const isTryingToEscape = createSelector(
  selectState,
  state => state.tryingToEscape,
);

const hasEscaped = createSelector(
  selectState,
  state => state.result,
);

export const selectors = {
  selectState,
  isTryingToEscape,
  hasEscaped,
};
