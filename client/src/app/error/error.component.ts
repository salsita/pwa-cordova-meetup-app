import { Component, Input } from '@angular/core';
import { ErrorCause } from '@models';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input() cause: ErrorCause;

  get text(): string {
    switch (this.cause) {
      case ErrorCause.UnknownId:
        return 'Unknown refreshment type';
      case ErrorCause.NotEnoughStocks:
        return 'We don\'t have enough stocks to satisfy your order';
      case ErrorCause.Offline:
        return 'You are not connected to the internet';
      default:
        return 'Something bad happened';
    }
  }
}
