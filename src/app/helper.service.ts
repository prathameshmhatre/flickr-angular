import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  selectedPhoto: any = {};

  constructor() {}

  updateSelectedPhoto(photo: any) {
    this.selectedPhoto = photo;
  }

  getInitialRating(id: string): number {
    if (localStorage.getItem('pid' + id) != null) {
      return JSON.parse(localStorage.getItem('pid' + id)).rating;
    } else return 0;
  }
}
