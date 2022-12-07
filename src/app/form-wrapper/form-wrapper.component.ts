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
        this.recommendationData.imgLink = enrichedData.Poster;
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

  cleanErrorMessage(errorMessage: string) {
    errorMessage = errorMessage.replace('movieOneInput', 'Movie 1').replace('movieTwoInput', 'Movie 2').replace('movieThreeInput', 'Movie 3');
    errorMessage += '!';
    return errorMessage;
  }

  handleResetEvent() {
    this.recommendationData.hasData = false;
  }
}
