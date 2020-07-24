import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlickrApiService {
  private flickrParams = {
    params: {
      api_key: 'f8bc49bff04bef747102c3685973e201',
      format: 'json',
      nojsoncallback: '1',
      per_page: '30',
    },
  };
  private flickrUrl = 'https://api.flickr.com/services/rest/';

  constructor(private http: HttpClient) {}

  getPhotos(pageNumber: number) {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.search';
    this.flickrParams.params['tags'] = 'food';
    this.flickrParams.params['text'] = 'food';
    this.flickrParams.params['page'] = pageNumber.toString();
    return this.http.get(API_URL, this.flickrParams);
  }

  getPhotoUrl(photo: any) {
    return (
      'http://farm' +
      photo.farm +
      '.static.flickr.com/' +
      photo.server +
      '/' +
      photo.id +
      '_' +
      photo.secret +
      '.jpg'
    );
  }

  getPhotoInfo(photoId: number) {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.getInfo';
    this.flickrParams.params['photo_id'] = photoId;
    return this.http.get(API_URL, this.flickrParams);
  }
}
