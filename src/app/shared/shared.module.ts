import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RatingModule } from 'ng-starrating';


import { NavbarComponent, SlideshowComponent, PeliculasPosterGridComponent, CastSlideShowComponent } from './components';
import { PosterPipe } from './pipes';

const COMPONENTS = [
  NavbarComponent,
  SlideshowComponent,
  PeliculasPosterGridComponent,
  CastSlideShowComponent
];

const PIPES = [
  PosterPipe
];

const MODULES_SHARES = [
  RatingModule
];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    ...MODULES_SHARES,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    ...MODULES_SHARES,
  ]
})
export class SharedModule { }
