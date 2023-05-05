import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Cast, MovieDetailsResponse } from '@shared/interfaces';
import { MoviesService } from '@shared/services';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public movie: MovieDetailsResponse = {} as MovieDetailsResponse;
  casts: Cast[] = [];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private location: Location
  ) {}

  ngOnInit(): void {
      const { id } = this.activateRoute.snapshot.params;

      combineLatest([
        this.moviesService.getMovieDetails(id),
        this.moviesService.getCreditsMovie(id)
      ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([movieDetail, casts]) => {
        if (!movieDetail) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.movie = movieDetail;
        this.casts = casts;
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
