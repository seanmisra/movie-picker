import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Recommendation } from '../models/recommendation.model';
import { UserData } from '../models/userData.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }


  getMovieRecommendation(userData: UserData): Observable<Recommendation> {
    console.log('getMovieRecommendation');
    const mockMovie = new Recommendation();
    mockMovie.movieName = 'Test Movie Name';
    mockMovie.movieYear = 2008;
    mockMovie.score = .92; 



    return of(
      mockMovie    
    );
  }
}
