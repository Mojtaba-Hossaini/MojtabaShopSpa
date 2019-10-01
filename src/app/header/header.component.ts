import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
  }

  saveDate() {
    this.dataService.saveRecipes();
  }

  getData() {
    this.dataService.getRecipe().subscribe();
  }


}
