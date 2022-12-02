import { Component } from '@angular/core';
import { Recommendation } from './models/recommendation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-picker';

  recommendationData: Recommendation = new Recommendation();


  handleRecommendationUpdateEvent(event: any) {
    this.recommendationData = event;
  }
}
