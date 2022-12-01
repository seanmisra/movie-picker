import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
import { UserInputsComponent } from './form-wrapper/user-inputs/user-inputs.component';
import { MovieRecommendationComponent } from './form-wrapper/movie-recommendation/movie-recommendation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    FormWrapperComponent,
    UserInputsComponent,
    MovieRecommendationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
