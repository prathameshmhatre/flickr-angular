import { HelperService } from './../helper.service';
import { FlickrApiService } from './../flickr-api.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageNumber: number = 1;
  photos: any = [];
  selected = 4;
  constructor(
    private flickrApiService: FlickrApiService,
    private router: Router,
    private helperSevice: HelperService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getFoodPhotos();
  }

  // Get all the photos related to food
  getFoodPhotos() {
    this.spinner.show();
    this.flickrApiService
      .getPhotos(this.pageNumber)
      .subscribe((results: any) => {
        this.photos = results.photos.photo;
        this.spinner.hide();
      });
  }

  // Get the image url
  imageUrl(photo) {
    return this.flickrApiService.getPhotoUrl(photo);
  }

  selectedPhoto(photo) {
    // We need to update the selected photo details
    // So that we can access it on next page
    this.helperSevice.updateSelectedPhoto(photo);

    // Redirect to individual photo component
    this.router.navigate(['/photo']);
  }

  checkAlreadyRated(id: string): number {
    return this.helperSevice.getInitialRating(id);
  }
}
