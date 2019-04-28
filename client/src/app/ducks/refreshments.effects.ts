import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, delay } from 'rxjs/operators';

import { RefreshmentType, QuantityInfo, ErrorCause } from '@models';

import {
  Actions as RefreshmentsActions,
  ActionType,
  GetTypesSuccess,
  GetTypesFail,
  GetQuantity,
  GetQuantitySuccess,
  GetQuantityFail,
  PutOrder,
  PutOrderSuccess,
  PutOrderFail,
  selectors,
  Clear,
} from './refreshments';
import { extractError } from '../utilities/errors';
import { StoreService } from '../store.service';

const baseUrl = '/api/refreshments';

@Injectable()
export default class Effects {
  @Effect()
  readonly getTypes = this.action$.pipe(
    ofType(RefreshmentsActions.GetTypes),
    switchMap(() => this.httpClient.get<RefreshmentType[]>(`${baseUrl}/types`).pipe(
      map(types => new GetTypesSuccess(types)),
      catchError(err => of(new GetTypesFail(extractError(err)))),
    )),
  );

  @Effect()
  readonly getQuantity = this.action$.pipe(
    ofType(RefreshmentsActions.GetQuantity),
    switchMap((action: GetQuantity) => this.httpClient.get<QuantityInfo>(`${baseUrl}/quantity/${action.typeId}`).pipe(
      map(qInfo => qInfo.id === action.typeId ? new GetQuantitySuccess(qInfo.quantity) : new GetQuantityFail(ErrorCause.NotSpecified)),
      catchError(err => of(new GetQuantityFail(extractError(err)))),
    )),
  );

  @Effect()
  readonly putOrder = this.action$.pipe(
    ofType(RefreshmentsActions.PutOrder),
    map((action: PutOrder) => action.quantity),
    withLatestFrom(this.storeService.select(selectors.selectSelectedType)),
    switchMap(([quantity, refreshmentType]) => this.httpClient.post(`${baseUrl}/order`, { quantity, refreshmentType }).pipe(
      map(() => new PutOrderSuccess()),
      catchError(err => of(new PutOrderFail(extractError(err)))),
    )),
  );

  @Effect()
  readonly delayedClear = this.action$.pipe(
    ofType(RefreshmentsActions.PutOrderSuccess),
    delay(3500),
    map(() => new Clear()),
  );

  constructor(private readonly action$: Actions<ActionType>, private httpClient: HttpClient, private storeService: StoreService) {}
}
