import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from '@shared/interfaces';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.scss']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() casts: Cast[] = [];

  ngOnInit(): void {
      // console.log(this.casts);
  }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
    });
  }

}
