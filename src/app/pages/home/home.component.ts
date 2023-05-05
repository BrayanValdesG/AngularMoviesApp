import { Component } from '@angular/core';
import { Movie, billPosterResponse } from 'src/app/interfaces/cartelera-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  constructor(private moviesService: MoviesService) {
    this.moviesService.getBillPoster()
    .subscribe((movies) => {
      this.movies = movies;
      this.moviesSlideShow = movies;
    })
  }

}
