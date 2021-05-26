import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LigaComponent } from './liga.component';
import { Ligas } from './Ligas';


@Injectable({
    providedIn: 'root'
  })

  export class LigaService {
      public ligasArray: Ligas[] = [];

      private apiServerUrl = environment.apiBaseUrl;
      ligaComponent: LigaComponent;
      constructor(private http: HttpClient) {}

      public getAllLigas(): Observable<Ligas[]> {
          return this.http.get<Ligas[]>(`${this.apiServerUrl}/ligas/all`);
      }

      public getLigaByEsporte(ligaEsporte: String): Observable<Ligas[]> {
          return this.http.get<Ligas[]>(`${this.apiServerUrl}/ligas/all/${ligaEsporte}`)
      }

      public addNewLiga(liga: Ligas): Observable<Ligas> {
          return this.http.post<Ligas>(`${this.apiServerUrl}/ligas/add`, liga);
      }

      public updateLiga(liga: Ligas): Observable<Ligas> {
          return this.http.put<Ligas>(`${this.apiServerUrl}/ligas/update`, liga);
      }

      public deleteLiga(ligaId: number): Observable<void> {
          return this.http.delete<void>(`${this.apiServerUrl}/ligas/delete/${ligaId}`);
      }
     
  }