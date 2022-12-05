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

  constructor(private http: HttpClient) { 
  }

  getAllMovies(): Observable<any> {
    return of(allMovieData.sort((a, b) => (a.movieName > b.movieName) ? 1 : -1));
  }
  
  private lookupMovie(lookupMovieName: string): MovieData {
    return this.allMovieDataLocal.find(movie => movie.movieName.toLowerCase() === lookupMovieName.toLowerCase()); 

  }


  getMovieRecommendation(userData: UserData): Observable<Recommendation> {
    this.allMovieDataLocal = allMovieData;


    let movieOne: MovieData
    let movieTwo: MovieData;
    let movieThree: MovieData;
    let relevantKeywords: any[] = [];
    
    movieOne = this.lookupMovie(userData.movieOne);
    if (movieOne) {
      relevantKeywords.push(...movieOne.keywords);
      this.allMovieDataLocal = this.allMovieDataLocal.filter(movie => movie.movieName !== movieOne.movieName);      
    }
    
    
    if (userData.movieTwo) {
      movieTwo = this.lookupMovie(userData.movieTwo);
      if (movieTwo) {
        relevantKeywords.push(...movieTwo.keywords);
        this.allMovieDataLocal = this.allMovieDataLocal.filter(movie => movie.movieName !== movieTwo.movieName);      
      }
    }
    if (userData.movieThree) {
      movieThree = this.lookupMovie(userData.movieThree);
      if (movieThree) {
        relevantKeywords.push(...movieThree.keywords);
        this.allMovieDataLocal = this.allMovieDataLocal.filter(movie => movie.movieName !== movieThree.movieName);      
      }
    }

    // unique array of applicable keywords 
    relevantKeywords = [...new Set(relevantKeywords)];
    console.log("relevantKeywords");
    console.log(relevantKeywords);

    const movieScores: { [id: string] : number; } = {};
    
    this.allMovieDataLocal.forEach((movieObj: MovieData) => {
      const sharedKeywords = movieObj.keywords.filter((kw: string) => relevantKeywords.includes(kw)); 
      const score = sharedKeywords.length;
      movieScores[movieObj.movieName] = score; 
    });    
    console.log("movieScores");
    console.log(movieScores);

    const recommendation = Object.keys(movieScores).reduce((a, b) => movieScores[a] > movieScores[b] ? a : b);
    const recommendationObj: Recommendation = this.allMovieDataLocal.find(movie => movie.movieName.toLowerCase() === recommendation.toLowerCase()); 
    recommendationObj.hasData = true;
    console.log("recommendationObj");
    console.log(recommendationObj);

    return of(
      recommendationObj  
    );
  }

  getEnrichedMovieData(movieTitle: string): Observable<any> {
    let url = this.MOVIE_DETAILS_BASE_URL + '/?i='
     + this.MOVIE_DETAILS_ID + '&apikey=' + this.MOVIE_DETAILS_KEY + '&t=' + movieTitle;  
    return this.http.get(url);
  }

}
