import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shoppinglist.sevice';
import { RecipeService } from './recipes/recipe.sevice';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-inteceptor.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule { }
