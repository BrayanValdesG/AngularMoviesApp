import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { CarteleraResponse } from './interfaces/cartelera-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moviesApp';

  constructor(private moviesService: MoviesService) {
    this.moviesService.getCartelera()
    .subscribe((res: CarteleraResponse) => {
      console.log(res);
    })
  }
}
