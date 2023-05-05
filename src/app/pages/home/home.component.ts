import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from '@shared/interfaces';
import { MoviesService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.moviesService.cargandoMoviesHome) {
        return;
      }
      this.moviesService.getBillPoster()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movies) => {
        this.movies.push(...movies)
      })
    }
  }

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getBillPoster()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((movies) => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    })
  }

  ngOnDestroy() {
    this.moviesService.resetCarteleraPage();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }

}
