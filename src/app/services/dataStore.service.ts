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

  apiurl = 'https://localhost:44383/api/countries';
  lazyUrl = '/lazy';

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getData(): Observable<Country[]> {
    return this.getAllCountries();
  }

  getDataLazy(first: number, rows: number, sortField: string, sortOrder:number, filters:any):  Observable<Countries> {
    return this.getCountries(first, rows, sortField, sortOrder, filters);
  }

  getAllCountries():Observable<Country[]>
  {
    return this.http.get<any>(this.apiurl).pipe(
      tap(data => console.log(data)),
      map(data => this.transformDataToCountryList(data)),
      catchError(this.handleError)
    );
  }

  getCountries(first: number, rows: number, sortField: string, sortOrder:number, filters:any): Observable<Countries>
  {
    var model = { 'First': first, 'Rows': rows, 'SortField': sortField, 'SortOrder': sortOrder, 'Filters': filters };

    return this.http.post<any>(this.apiurl + this.lazyUrl, model).pipe(
      tap(data => console.log(data)),
      map(data => this.transformDataToCountries(data)),
      catchError(this.handleError)
    );

  }

  transformDataToCountryList(data: any): Country[] {
    var list: Country[] = [];

    data.forEach(element => {
      list.push(new Country(element["id"], element["name"], element["capital"], element["region"], element["population"]))
    });
    return list;
  }

  transformDataToCountries(data: any): Countries {
    var list: Country[] = [];

    data.list.forEach(element => {
      list.push(new Country(element["id"], element["name"], element["capital"], element["region"], element["population"]))
    });

    var response = new Countries(list, data.totalRecords);
    return response;
  }
}
