import { Component } from "@angular/core";
import { Response } from "@angular/http";
import { StorageService } from '../../shared/storage.service';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
})
export class HeaderComponent {
    constructor(private storageService: StorageService) {

    }
    onSaveData() {
        this.storageService.storeRecipes().subscribe((response: Response) => {
            console.log(response);
        });
    }

    onFetchData() {
        this.storageService.getRecipes();
    }
}