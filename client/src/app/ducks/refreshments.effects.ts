import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, delay, ignoreElements } from 'rxjs/operators';

import { RefreshmentType, QuantityInfo, ErrorCause } from '@models';
import { environment } from 'src/environments/environment';

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
  NotificationsToggled,
} from './refreshments';
import { extractError } from '../utilities/errors';
import { StoreService } from '../store.service';

const baseUrl = '/api/refreshments';

declare global {
  interface Window {
    swRegistration: ServiceWorkerRegistration;
    checkNotifications: () => Promise<void>;
  }
}

@Injectable()
export class Effects {
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

  @Effect()
  readonly initNotificationsState = this.action$.pipe(
    ofType('@ngrx/effects/init'),
    map(() => window.checkNotifications = this.checkNotifications),
    ignoreElements(),
  );

  @Effect()
  readonly toggleNotifications = this.action$.pipe(
    ofType(RefreshmentsActions.ToggleNotifications),
    switchMap(() => from(toggleNotifications()).pipe(
      map(newValue => new NotificationsToggled(newValue)),
      catchError(() => of(new NotificationsToggled(false))),
    )),
  );

  readonly checkNotifications = async () => {
    const subscription = await window.swRegistration.pushManager.getSubscription();
    this.storeService.dispatch(new NotificationsToggled(subscription !== null));
  }

  constructor(private readonly action$: Actions<ActionType>, private httpClient: HttpClient, private storeService: StoreService) {}
}

async function toggleNotifications(): Promise<boolean> {
  let subscription = await window.swRegistration.pushManager.getSubscription();
  if (!subscription) {
    try {
      const applicationServerKey = urlB64ToUint8Array(environment.applicationServerPublicKey);
      subscription = await window.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      });

      await saveSubscription(subscription);
      return subscription !== null;
    } catch (err) {
      console.error('Failed to subscribe to push manager', err);
      return false;
    }
  } else {
    await subscription.unsubscribe();
    await saveSubscription(null);
    return false;
  }
}

async function saveSubscription(subscription: PushSubscription): Promise<void> {
  await fetch('/api/notifications/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscription }),
  });
}

const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
