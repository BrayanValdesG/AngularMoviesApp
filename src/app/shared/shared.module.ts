import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RatingModule } from 'ng-starrating';


import { NavbarComponent, SlideshowComponent, PeliculasPosterGridComponent } from './components';
import { PipesModule } from '../pipes/pipes.module';

const COMPONENTS = [
  NavbarComponent,
  SlideshowComponent,
  PeliculasPosterGridComponent
]


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
