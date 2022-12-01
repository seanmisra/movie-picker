import { Component, Input, OnInit } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation.model';

@Component({
  selector: 'movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.scss']
})
export class MovieRecommendationComponent implements OnInit {

  @Input() recommendation: Recommendation;

  constructor() { }

  ngOnInit(): void {
  }

}
