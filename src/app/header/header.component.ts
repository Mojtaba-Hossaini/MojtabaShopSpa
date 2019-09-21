import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(selectReceive: string) {
    this.selectItem.emit(selectReceive);
  }

}
