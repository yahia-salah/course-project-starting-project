import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedMenuItem = 'recipes';
  onMenuItemClicked(menuItem: string) {
    console.log(`Menu Item: ${menuItem} clicked`);
    this.selectedMenuItem = menuItem;
  }
}
