import { Component, OnInit } from '@angular/core';
import { Recommendation } from '../models/recommendation.model';
import { UserData } from '../models/userData.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {

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
      this.recommendationData = recommendation;
    });

    console.log(this.recommendationData);
  }

  handleResetEvent() {
    this.recommendationData.hasData = false;
  }
}
