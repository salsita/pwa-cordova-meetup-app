import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from '../store.service';
import { TakePath, ClearResult, selectors as officePlanSelectors } from '../ducks/officePlan';

@Component({
  selector: 'app-office-plan',
  templateUrl: './office-plan.component.html',
  styleUrls: ['./office-plan.component.scss']
})
export class OfficePlanComponent implements OnInit {
  isTryingToEscape: Observable<boolean>;
  hasEscaped: Observable<boolean>;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.isTryingToEscape = this.storeService.select(officePlanSelectors.isTryingToEscape);
    this.hasEscaped = this.storeService.select(officePlanSelectors.hasEscaped);
  }

  onTakePath(pathNumber: number) {
    this.storeService.dispatch(new TakePath(pathNumber));
  }

  onCloseResult() {
    this.storeService.dispatch(new ClearResult());
  }
}
