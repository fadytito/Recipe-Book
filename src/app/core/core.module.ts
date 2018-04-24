import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { RecipesService } from '../recipes/recipes.service';
import { StorageService } from '../shared/storage.service';


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [ShoppingListService, RecipesService, StorageService]
})
export class CoreModule { }
