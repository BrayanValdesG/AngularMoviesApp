import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Movie, billPosterResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiMovie = environment.urlBase;
  private carteleraPage = 1;

  constructor(
    private http: HttpClient
  ) { }

  get params() {
    return {
      api_key: environment.apiKey,
      language: environment.language,
      page: this.carteleraPage
    }
  }

  getBillPoster(): Observable<Movie[]> {
    return this.http.get<billPosterResponse>(this.apiMovie + '/movie/now_playing', {
      params: this.params
    })
    .pipe(map((resp) => resp.results))
    .pipe(tap(() => {
      this.carteleraPage += 1;
    }))
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
