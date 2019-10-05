import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  
  constructor(private dataService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  saveDate() {
    this.dataService.saveRecipes();
  }

  getData() {
    this.dataService.getRecipe().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
  }


}
