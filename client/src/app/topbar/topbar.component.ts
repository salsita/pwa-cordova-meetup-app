import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Input() sidebarVisible: boolean;
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
