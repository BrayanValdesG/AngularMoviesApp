import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/*';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CreditsResponseMovie, Movie, MovieDetailsResponse, billPosterResponse } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiMovie = environment.urlBase;
  private carteleraPage = 1;
  public cargandoMoviesHome: boolean = false;

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
    if (this.cargandoMoviesHome) {
      return of([]);
    }
    this.cargandoMoviesHome = true;
    return this.http.get<billPosterResponse>(`${this.apiMovie}/movie/now_playing`, {
      params: this.params
    })
    .pipe(map((resp) => resp.results))
    .pipe(tap(() => {
      this.carteleraPage += 1;
      this.cargandoMoviesHome = false;
    }))
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  searchMovie(query: string): Observable<Movie[]> {
    const params = {...this.params, page: 1, query};
    return this.http.get<billPosterResponse>(`${this.apiMovie}/search/movie`, {
      params
    })
    .pipe(map((resp) => resp.results))
    .pipe(map(this.extractData))
    .pipe(catchError(this.handleError));
  }

  getMovieDetails(id: string): Observable<MovieDetailsResponse | null> {
    return this.http.get<MovieDetailsResponse>(`${this.apiMovie}/movie/${id}`, {
      params: this.params
    })
    .pipe(map(this.extractData))
    .pipe(err => of(null));
  }

  getCreditsMovie(id: string): Observable<CreditsResponseMovie[]> {
    return this.http.get<CreditsResponseMovie>(`${this.apiMovie}/movie/${id}/credits`, {
      params: this.params
    })
    .pipe(map((resp) => resp.cast))
    .pipe(map(this.extractData))
    .pipe(err => of([]));
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
