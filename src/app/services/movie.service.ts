import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Recommendation } from '../models/recommendation.model';
import { UserData } from '../models/userData.model';
import { allMovieData } from 'src/assets/mockMovieData';
import { MovieData } from '../models/movieData.model';
import { HttpClient } from '@angular/common/http';
import { config } from 'config';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  allMovieDataLocal: any[];
  
  MOVIE_DETAILS_BASE_URL = 'http://www.omdbapi.com';
  MOVIE_DETAILS_ID = config.MOVIE_ID;
  MOVIE_DETAILS_KEY = config.MOVIE_KEY;

  MOVIE_API_BASE_URL = config.MOVIE_API_BASE_URL ? config.MOVIE_API_BASE_URL : 'http://localhost';
  MOVIE_API_PORT = config.MOVIE_API_PORT ? config.MOVIE_API_PORT : 8080;

  constructor(private http: HttpClient) { 
  }

  getAllMovies(): Observable<any> {
    let url = this.MOVIE_API_BASE_URL + ':' + this.MOVIE_API_PORT + '/allMovies';
    return this.http.get(url);
  }

  getMovieRecommendation(userData: UserData): Observable<any> {
    let url = this.MOVIE_API_BASE_URL + ':' + this.MOVIE_API_PORT + '/recommendation';
    let body = {
      movieOneInput: userData.movieOne,
      movieTwoInput: userData.movieTwo,
      movieThreeInput: userData.movieThree
    }

    return this.http.post(url, body);
  }

  getEnrichedMovieData(movieTitle: string): Observable<any> {
    let url = this.MOVIE_DETAILS_BASE_URL + '/?i='
     + this.MOVIE_DETAILS_ID + '&apikey=' + this.MOVIE_DETAILS_KEY + '&t=' + movieTitle;  
    return this.http.get(url);
  }

}
