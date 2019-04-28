import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

import { ErrorCause, RefreshmentType } from '@models';

export enum Actions {
  GetTypes = '@@refreshments/GET_TYPES',
  GetTypesSuccess = '@@refreshments/GET_TYPES_SUCCESS',
  GetTypesFail = '@@refreshments/GET_TYPES_FAIL',
  GetQuantity = '@@refreshments/GET_QUANTITY',
  GetQuantitySuccess = '@@refreshments/GET_QUANTITY_SUCCESS',
  GetQuantityFail = '@@refreshments/GET_QUANTITY_FAIL',
  PutOrder = '@@refreshments/PUT_ORDER',
  PutOrderSuccess = '@@refreshments/PUT_ORDER_SUCCESS',
  PutOrderFail = '@@refreshments/PUT_ORDER_FAIL',
  Clear = '@@refreshments/CLEAR',
}

export type ActionType =
  | GetTypes
  | GetTypesSuccess
  | GetTypesFail
  | GetQuantity
  | GetQuantitySuccess
  | GetQuantityFail
  | PutOrder
  | PutOrderSuccess
  | PutOrderFail
  | Clear;

export class GetTypes implements Action {
  readonly type = Actions.GetTypes;
}

export class GetTypesSuccess implements Action {
  readonly type = Actions.GetTypesSuccess;
  constructor(readonly types: RefreshmentType[]) {}
}

export class GetTypesFail implements Action {
  readonly type = Actions.GetTypesFail;
  constructor(readonly cause: ErrorCause) {}
}

export class GetQuantity implements Action {
  readonly type = Actions.GetQuantity;
  constructor(readonly typeId: number) {}
}

export class GetQuantitySuccess implements Action {
  readonly type = Actions.GetQuantitySuccess;
  constructor(readonly quantity: number) {}
}

export class GetQuantityFail implements Action {
  readonly type = Actions.GetQuantityFail;
  constructor(readonly cause: ErrorCause) {}
}

export class PutOrder implements Action {
  readonly type = Actions.PutOrder;
  constructor(readonly quantity: number) {}
}

export class PutOrderSuccess implements Action {
  readonly type = Actions.PutOrderSuccess;
}

export class PutOrderFail implements Action {
  readonly type = Actions.PutOrderFail;
  constructor(readonly cause: ErrorCause) {}
}

export class Clear implements Action {
  readonly type = Actions.Clear;
}

export const statePath = 'refreshments';

export class State {
  loadingTypes = false;
  typesError: ErrorCause = null;
  types: RefreshmentType[] = [];
  selectedType: number = null;
  loadingQuantity = false;
  quantity: number = null;
  quantityError: ErrorCause = null;
  puttingOrder = false;
  delivering = false;
  orderError: ErrorCause = null;
}

export function reducer(state: State = new State(), action: ActionType): State {
  switch (action.type) {
    case Actions.GetTypes:
      return { ...state, types: [], typesError: null, loadingTypes: true };
    case Actions.GetTypesSuccess:
      return { ...state, types: action.types, loadingTypes: false };
    case Actions.GetTypesFail:
      return { ...state, loadingTypes: false, typesError: action.cause };
    case Actions.GetQuantity:
      return { ...state, selectedType: action.typeId, quantity: null, loadingQuantity: true, quantityError: null };
    case Actions.GetQuantitySuccess:
      return { ...state, quantity: action.quantity, loadingQuantity: false };
    case Actions.GetQuantityFail:
      return { ...state, quantityError: action.cause, loadingQuantity: false };
    case Actions.PutOrder:
      return { ...state, puttingOrder: true, orderError: null, delivering: false };
    case Actions.PutOrderSuccess:
      return { ...state, puttingOrder: false, delivering: true };
    case Actions.PutOrderFail:
      return { ...state, puttingOrder: false, orderError: action.cause };
    case Actions.Clear:
      return { ...new State(), types: state.types };
    default:
      return state;
  }
}

const selectState = createFeatureSelector<State>(statePath);

const isLoadingTypes = createSelector(
  selectState,
  state => state.loadingTypes,
);

const selectTypes = createSelector(
  selectState,
  state => state.types,
);

const selectTypesError = createSelector(
  selectState,
  state => state.typesError,
);

const selectSelectedType = createSelector(
  selectState,
  state => state.selectedType,
);

const isLoadingQuantity = createSelector(
  selectState,
  state => state.loadingQuantity,
);

const selectQuantity = createSelector(
  selectState,
  state => state.quantity,
);

const selectQuantityError = createSelector(
  selectState,
  state => state.quantityError,
);

const isPuttingOrder = createSelector(
  selectState,
  state => state.puttingOrder,
);

const isDelivering = createSelector(
  selectState,
  state => state.delivering,
);

const selectOrderError = createSelector(
  selectState,
  state => state.orderError,
);

export const selectors = {
  selectState,
  isLoadingTypes,
  selectTypes,
  selectTypesError,
  selectSelectedType,
  isLoadingQuantity,
  selectQuantity,
  selectQuantityError,
  isPuttingOrder,
  isDelivering,
  selectOrderError,
};
