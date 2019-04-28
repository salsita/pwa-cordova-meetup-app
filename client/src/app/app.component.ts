import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  sidebarVisible = false;

  onToggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
