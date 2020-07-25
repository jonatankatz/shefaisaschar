import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  public cityUrl = "http://localhost:4000/address/city";
  public streetUrl = "http://localhost:4000/address/street";

  constructor(private httpClient: HttpClient) {

   }

  getCity(citySearchInput): Observable<Object> {
    return this.httpClient.get(`${this.cityUrl}?c=${citySearchInput}`).pipe(map((result: Array<any>) => {
      return result;
    }))
  }
  getStreet(cityInput, streetSearchInput): Observable<Object> {
    console.log(cityInput, streetSearchInput)
    return this.httpClient.get(`${this.streetUrl}?c=${cityInput}&s=${streetSearchInput}`).pipe(map((result: Array<any>) => {
      return result;
    }))
  }
}
