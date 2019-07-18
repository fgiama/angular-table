import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Country } from '../entities/country';
import { throwError, Observable, Subject } from 'rxjs';
import { tap, catchError, map} from 'rxjs/operators';
import { Countries } from '../entities/countries';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  apiurl = 'https://restcountries.eu/rest/v2/all';
  lazyUrl = 'lazy';

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getData(): Observable<Country[]> {
    return this.getAllCountries();
  }

  getDataLazy(first: number, rows: number, sortField: string, sortOrder:number, filters:any): Countries {
    return this.getCountries(first, rows, sortField, sortOrder, filters);
  }

  getAllCountries():Observable<Country[]>
  {
    return this.http.get<any>(this.apiurl).pipe(
      tap(data => console.log(data)),
      map(data => this.transformDataToCountries(data)),
      catchError(this.handleError)
    );
  }

  getCountries(first: number, rows: number, sortField: string, sortOrder:number, filters:any): Countries
  {
    var allCountries: Country[] = [];
    var requestedCountryList: Country[] = [];
    this.getAllCountries().subscribe(data => { allCountries = data; });

    //TODO: page and filter
    return new Countries(requestedCountryList, allCountries.length);
  }

  transformDataToCountries(data: any): Country[] {
    var list: Country[] = [];

    data.forEach(element => {
      list.push(new Country(element["alpha2Code"], element["name"], element["capital"], element["region"], element["population"]))
    });
    return list;
  }
}
