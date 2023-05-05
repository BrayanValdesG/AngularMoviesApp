import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable, catchError, map, throwError } from 'rxjs';
import { billPosterResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiMovie = environment.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  getBillPoster(): Observable<billPosterResponse> {
    return this.http.get<billPosterResponse>(this.apiMovie + '/movie/now_playing?api_key=d41bffd877802499e927e98410db7f23&language=es-Es&page=1')
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));
  }

    // Retorna el json de la petición
    private extractData(res: any) {
      if (res.status < 200 || res.status >= 300) {
        throw new Error("Bad response status: " + res.status);
      }
      return res;
    }

    // Manejador de errores
    private handleError(error: any) {
      const errMsg = error.message || "Server error";
      console.error("Error al comunicarse al servicio:" + errMsg);
      return throwError(errMsg);
    }
}
