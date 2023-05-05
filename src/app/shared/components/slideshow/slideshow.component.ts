import { AfterViewInit, Component, Input } from '@angular/core';
import { Movie } from '@shared/interfaces';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements AfterViewInit {

  @Input() movies: Movie[] = [];
  swiper!: Swiper;

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true,
    });
  }

  onSlideNext(): void {
    this.swiper.slideNext();
  }

  onSlidePrev(): void {
    this.swiper.slidePrev();
  }

}
