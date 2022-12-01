import { Component, OnInit } from '@angular/core';
import { Recommendation } from '../models/recommendation.model';

@Component({
  selector: 'form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {

  recommendationData: Recommendation = new Recommendation();

  constructor() { }

  ngOnInit(): void {
    this.handleResetEvent();
  }


  handleSubmitEvent(event: any) {
    console.log(event);
    this.getRecommendation(event);
  }

  getRecommendation(dataInputs: any) {
    this.recommendationData = new Recommendation();
    this.recommendationData.movieName = 'Test Movie Name';
    this.recommendationData.movieYear = 2008;
    this.recommendationData.score = .92; 

    console.log(this.recommendationData);
  }

  handleResetEvent() {
    this.recommendationData.hasData = false;
  }
}
