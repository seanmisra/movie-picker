import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recommendation } from '../models/recommendation.model';
import { UserData } from '../models/userData.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {

  @Output() recommendationUpdateEvent = new EventEmitter<any>();

  recommendationData: Recommendation = new Recommendation();
  movieNameErrorMessage = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.handleResetEvent();
  }


  handleSubmitEvent(event: any) {
    console.log(event);
    this.getRecommendation(event);
  }

  getRecommendation(dataInputs: UserData) {
    this.movieService.getMovieRecommendation(dataInputs).subscribe(recommendation => {
      this.movieNameErrorMessage = '';
      this.recommendationData = recommendation;

      this.movieService.getEnrichedMovieData(recommendation.movieName).subscribe(enrichedData => {
        this.enrichData(enrichedData);
        console.log(this.recommendationData);
        console.log(this.recommendationData);
        this.recommendationUpdateEvent.emit(this.recommendationData);
      })
    }, error => {
      console.log('ERROR: retrieving movie recommendation data');
      console.log(error)
      this.handleResetEvent();
      if (error.error && error.error.message && error.status &&
        error.status >= 400 && error.status <500) {
          this.movieNameErrorMessage = this.cleanErrorMessage(error.error.message);
        }
    });
  }

  enrichData(enrichedData: any) {
    this.recommendationData.imgLink = enrichedData.Poster;
    this.recommendationData.actors = enrichedData.Actors;
    this.recommendationData.boxOffice = enrichedData.BoxOffice;
    this.recommendationData.director = enrichedData.Director;
    this.recommendationData.genre = enrichedData.Genre;
    this.recommendationData.language = enrichedData.Language;
    this.recommendationData.plot = enrichedData.Plot;
    this.recommendationData.rated = enrichedData.Rated;
    this.recommendationData.ratings = enrichedData.Ratings;
    this.recommendationData.released = enrichedData.Released;
    this.recommendationData.runtime = enrichedData.Runtime;
  }

  cleanErrorMessage(errorMessage: string) {
    errorMessage = errorMessage.replace('movieOneInput', 'Movie 1').replace('movieTwoInput', 'Movie 2').replace('movieThreeInput', 'Movie 3');
    errorMessage += '!';
    return errorMessage;
  }

  handleResetEvent() {
    this.recommendationData.hasData = false;
  }
}
