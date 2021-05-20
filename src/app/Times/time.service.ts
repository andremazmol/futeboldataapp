import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimeComponent } from './time.component';
import { Times } from './Times';

@Injectable({
    providedIn: 'root'
  })

  export class TimeService {
      public timesArray: Times[] = [];

      private apiServerUrl = environment.apiBaseUrl;
      timeComponent: TimeComponent;
      constructor(private http: HttpClient) {}

      public getAllTimes(): Observable<Times[]> {
          return this.http.get<Times[]>(`${this.apiServerUrl}/times/all`);
      }

      public getTimeByLeague(timeLeague: String): Observable<Times[]> {
          return this.http.get<Times[]>(`${this.apiServerUrl}/times/all/${timeLeague}`)
      }

      public addNewTime(time: Times): Observable<Times> {
          return this.http.post<Times>(`${this.apiServerUrl}/times/add`, time);
      }

      public updateTime(time: Times): Observable<Times> {
          return this.http.put<Times>(`${this.apiServerUrl}/times/update`, time);
      }

      public deleteTime(timeId: number): Observable<void>{
          return this.http.delete<void>(`${this.apiServerUrl}/times/delete/${timeId}`);
      }
  }