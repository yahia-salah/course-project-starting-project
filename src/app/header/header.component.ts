import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() menuItemClicked = new EventEmitter<string>();
  currentActiveMenuItem = 'recipes';

  constructor() {}

  ngOnInit(): void {}

  onMenuItemClick(menuItem: string) {
    this.menuItemClicked.emit(menuItem);
  }
}
