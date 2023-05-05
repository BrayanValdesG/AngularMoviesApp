import { Component, HostListener } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.moviesService.cargandoMoviesHome) {
        return;
      }
      this.moviesService.getBillPoster()
      .subscribe((movies) => {
        this.movies.push(...movies)
      })
    }
  }

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
