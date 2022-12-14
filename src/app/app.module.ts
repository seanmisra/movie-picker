import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
import { UserInputsComponent } from './form-wrapper/user-inputs/user-inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule, MatCardModule  } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MovieRecommendationComponent } from './movie-recommendation/movie-recommendation.component';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
