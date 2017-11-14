import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  location = '';
  pics: any;
  clientId = '29fd48e4ddef413caee4431e3fc8469a';
  access_token = '2241599753.29fd48e.df1fa60305a341c2b08e663782cb741f';
  // https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN


  constructor(private http: Http) {}

  getCoordinates() {
    const googleApi = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.location;
    return this.http.get(googleApi).map(res => res.json());
  }

  submitLocation() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200/');
    headers.append('Access-Control-Allow-Credentials', 'true');

    this.getCoordinates().subscribe(mapData => {
      const lat = mapData.results[0].geometry.location.lat;
      const lng = mapData.results[0].geometry.location.lng;
      const instagramPicApi = 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + lng + '&access_token=' + this.access_token;

      this.http.get(instagramPicApi, {headers: headers}).map(res => res.json()).subscribe(picData => {
        console.log(picData);
        this.pics = picData;
      });
    }, (error => {
      console.log(error);
    }));
  }

}

// curl -F 'client_id=29fd48e4ddef413caee4431e3fc8469a' -F 'client_secret=bbc1755de409455b8926dab0b01d6c85' -F 'grant_type=authorization_code' -F 'redirect_uri=http://localhost:4200/' -F 'code=ecefd6e77a434bdaafd57270d27e5014' https://api.instagram.com/oauth/access_token
