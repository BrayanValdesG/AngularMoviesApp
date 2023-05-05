import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movie } from '@shared/interfaces';
import { MoviesService } from '@shared/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public movies: Movie[] = [];
  searchText = '';
  total_pages: number[] = [];
  total_number_pages: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    public moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({text}) => {
      this.searchText = text;
      this.searchMovie(text);
    })
  }

  searchMovie(text: string): void {
    this.moviesService.searchMovie(text)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((resp) => {
      this.total_number_pages = resp.total_pages;
      this.total_pages = [];
      for (let i = 0; i < resp.total_pages; i++) {
        this.total_pages.push(i);
      }
      this.movies = resp.results;
    })
  }

  onPrevious() {
    this.moviesService.busquedaPage -=1;
    this.searchMovie(this.searchText);
  }

  onNext() {
    this.moviesService.busquedaPage +=1;
    this.searchMovie(this.searchText);
  }

  onPaginate(number: number) {
    this.moviesService.busquedaPage = number;
    this.searchMovie(this.searchText);
  }

  ngOnDestroy() {
    this.moviesService.busquedaPage = 1;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }

}
