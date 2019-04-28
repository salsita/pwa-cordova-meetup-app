import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() visible: boolean;
  @Output() close: EventEmitter<void> = new EventEmitter();

  onClick() {
    this.close.emit();
  }
}
