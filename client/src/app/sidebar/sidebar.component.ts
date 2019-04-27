import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() visible: boolean;
  @Output() close: EventEmitter<void> = new EventEmitter();

  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.classList.contains('Sidebar-link')) {
      this.close.emit();
    }
  }
}
