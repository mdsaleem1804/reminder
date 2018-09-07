import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  showLoader: boolean = false;

  show() {
    this.showLoader = true;
  }

  hide() {
    this.showLoader = false;
  }
}
