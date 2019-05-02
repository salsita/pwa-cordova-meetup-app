import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ErrorCause } from '@models';

import { StoreService } from 'src/app/store.service';
import { GetTypes, GetQuantity, selectors, PutOrder, Clear, ToggleNotifications } from 'src/app/ducks/refreshments';

declare global {
  interface Window {
    swRegistration: ServiceWorkerRegistration;
  }
}

interface RefreshmentTypeSanitized {
  id: number;
  name: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-refreshments',
  templateUrl: './refreshments.component.html',
})
export class RefreshmentsComponent implements OnInit, OnDestroy {
  loadingTypes: Observable<boolean>;
  refreshmentTypes: Observable<RefreshmentTypeSanitized[]>;
  typesError: Observable<ErrorCause>;

  selectedType: Observable<number>;

  loadingQuantity: Observable<boolean>;
  quantity: Observable<number>;
  quantityError: Observable<ErrorCause>;

  puttingOrder: Observable<boolean>;
  delivering: Observable<boolean>;
  orderError: Observable<ErrorCause>;

  showNotificationsControl: Observable<boolean>;
  notificationsAllowed: Observable<boolean>;
  togglingNotifications: Observable<boolean>;

  desiredQuantity: number;

  constructor(private storeService: StoreService, private sanitizer: DomSanitizer) { }

  get validQuantity(): boolean {
    let available: number;
    this.quantity.pipe(
      take(1),
    ).subscribe(q => available = q);
    return Number.isInteger(this.desiredQuantity) && this.desiredQuantity >= 1 && this.desiredQuantity <= available;
  }

  ngOnInit() {
    this.storeService.dispatch(new GetTypes());

    this.loadingTypes = this.storeService.select(selectors.isLoadingTypes);
    this.refreshmentTypes = this.storeService.select(selectors.selectTypes).pipe(
      map(types => types.map(t => ({ ...t, icon: this.sanitizer.bypassSecurityTrustHtml(t.icon) }))),
    );
    this.typesError = this.storeService.select(selectors.selectTypesError);

    this.selectedType = this.storeService.select(selectors.selectSelectedType);

    this.loadingQuantity = this.storeService.select(selectors.isLoadingQuantity);
    this.quantity = this.storeService.select(selectors.selectQuantity);
    this.quantityError = this.storeService.select(selectors.selectQuantityError);

    this.puttingOrder = this.storeService.select(selectors.isPuttingOrder);
    this.delivering = this.storeService.select(selectors.isDelivering);
    this.orderError = this.storeService.select(selectors.selectOrderError);

    this.showNotificationsControl = this.storeService.select(selectors.isNotificationsControlVisible);
    this.notificationsAllowed = this.storeService.select(selectors.areNotificationsAllowed);
    this.togglingNotifications = this.storeService.select(selectors.isTogglingNotifications);
  }

  ngOnDestroy() {
    this.storeService.dispatch(new Clear());
  }

  onSelectType(id: number) {
    this.storeService.dispatch(new GetQuantity(id));
    this.desiredQuantity = 1;
  }

  onOrder() {
    this.storeService.dispatch(new PutOrder(this.desiredQuantity));
  }

  onClear() {
    this.storeService.dispatch(new Clear());
  }

  onToggleNotifications() {
    this.storeService.dispatch(new ToggleNotifications());
  }
}
