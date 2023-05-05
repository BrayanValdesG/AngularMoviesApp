import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.scss']
})
export class PeliculasPosterGridComponent {

  @Input() movies: Movie[] = [];

  constructor(
    private router: Router
  ) {}

  redirectDetailMovie(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }
}
