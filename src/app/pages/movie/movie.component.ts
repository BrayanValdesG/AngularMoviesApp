import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { MovieDetailsResponse } from 'src/app/interfaces/movie-details-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public movie: MovieDetailsResponse = {} as MovieDetailsResponse;

  constructor(
    private activateRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private location: Location
  ) {}

  ngOnInit(): void {
      const { id } = this.activateRoute.snapshot.params;
      this.moviesService.getMovieDetails(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movieDetail) => {
        this.movie = movieDetail;
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }

  back() {
    this.location.back();
  }
}
