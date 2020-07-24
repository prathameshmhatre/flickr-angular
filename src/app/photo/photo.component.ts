import { Router } from '@angular/router';
import { ToastService } from './../toast.service';
import { FlickrApiService } from './../flickr-api.service';
import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
  selectedPhoto: any = {};
  userReview: any = {};
  initialRating: number = 0;
  constructor(
    private helperService: HelperService,
    private flickrApiService: FlickrApiService,
    private router: Router,
    public toastService: ToastService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    // First check if we already have the ratings for selected photp
    if (
      localStorage.getItem('pid' + this.helperService.selectedPhoto.id) != null
    ) {
      this.userReview = JSON.parse(
        localStorage.getItem('pid' + this.helperService.selectedPhoto.id)
      );
      this.initialRating = this.userReview.rating;
    }

    this.getImageInfo();
  }

  // Get information regarding the image
  getImageInfo() {
    this.flickrApiService
      .getPhotoInfo(this.helperService.selectedPhoto.id)
      .subscribe(
        (result: any) => {
          this.selectedPhoto = result.photo;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  // Get the image url
  imageUrl() {
    return this.flickrApiService.getPhotoUrl(this.selectedPhoto);
  }

  // Set the ratings given by the user
  onRatingSet(stars: any) {
    this.userReview.rating = stars;
  }
  // Add the review to the localstorage
  addPhotoReview() {
    if (this.validate()) {
      // Save the rating and review
      localStorage.setItem(
        'pid' + this.selectedPhoto.id,
        JSON.stringify(this.userReview)
      );

      // Show the success message
      this.toastService.show('Review addedd Successfully', {
        classname: 'bg-success text-light',
        delay: 5000,
        autohide: true,
      });

      // Redirect to home page
      this.router.navigate(['/home']);
    } else {
      // Show the error message
      this.toastService.show('Validation Errors', {
        classname: 'bg-danger text-light',
        delay: 5000,
        autohide: true,
      });
    }
  }

  // Validate for empty review by and review
  validate() {
    if (
      this.userReview['reviewText'] &&
      this.userReview['reviewText'].length !== 0 &&
      this.userReview['ratingBy'] &&
      this.userReview['ratingBy'].length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
