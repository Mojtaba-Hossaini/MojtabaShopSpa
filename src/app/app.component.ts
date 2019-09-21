import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemSelected = 'all';

  onSelectedItem(selectedItemReceived: string) {
    this.itemSelected = selectedItemReceived;
  }
}
