import { AfterViewInit, Component, Input } from '@angular/core';
import { Cast } from '@shared/interfaces';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.scss']
})
export class CastSlideShowComponent implements AfterViewInit {

  @Input() casts: Cast[] = [];

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
    });
  }

}
