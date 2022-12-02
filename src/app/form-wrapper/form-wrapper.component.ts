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

      this.movieService.getEnrichedMovieData(recommendation.movieName).subscribe(enrichedData => {
        console.log(enrichedData);
      }) 



      this.recommendationData = recommendation;
      this.recommendationUpdateEvent.emit(this.recommendationData);
    });

    console.log(this.recommendationData);
  }

  handleResetEvent() {
    this.recommendationData.hasData = false;
  }
}
