import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {

  movieForm: FormGroup;
  movieOptions = [];
  filteredMovieOptions = [];
  filteredMovieOptionsTwo = [];
  filteredMovieOptionsThree = [];
  errorMessage = '';

  @Output() submitEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();

  @Input() movieNameErrorMessage = '';

  constructor(private fb: FormBuilder, private movieService: MovieService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadMovieOptions();
  }

  initForm() {
    this.movieForm = this.fb.group({
      movieOne: '',
      movieTwo: '',
      movieThree: ''
    });

    this.movieForm.get('movieOne').valueChanges.subscribe(val => {
      val = ((val === null) || (val === undefined)) ? '' : val;
      this.filterData(val);
    });

    this.movieForm.get('movieTwo').valueChanges.subscribe(val => {
      val = ((val === null) || (val === undefined)) ? '' : val;
      this.filterDataTwo(val);
    });

    this.movieForm.get('movieThree').valueChanges.subscribe(val => {
      val = ((val === null) || (val === undefined)) ? '' : val;
      this.filterDataThree(val);
    });
  }

  filterData(val: string) {
    val = ((val === null) || (val === undefined)) ? '' : val;

    this.filteredMovieOptions = this.movieOptions.filter((movie:any) => {
      return movie.movieName.toLowerCase().indexOf(val.toLowerCase()) > -1;
    })
  }

  filterDataTwo(val: string) {
    val = ((val === null) || (val === undefined)) ? '' : val;

    this.filteredMovieOptionsTwo = this.movieOptions.filter((movie:any) => {
      return movie.movieName.toLowerCase().indexOf(val.toLowerCase()) > -1;
    })
  }

  filterDataThree(val: string) {
    val = ((val === null) || (val === undefined)) ? '' : val;

    this.filteredMovieOptionsThree = this.movieOptions.filter((movie:any) => {
      return movie.movieName.toLowerCase().indexOf(val.toLowerCase()) > -1;
    })
  }

  loadMovieOptions() {
    this.movieService.getAllMovies().pipe(first()).subscribe(movieData => {
      this.movieOptions = this.filteredMovieOptions = this.filteredMovieOptionsTwo = this.filteredMovieOptionsThree = movieData;
    })
  }

  submitMovieForm() {
    if (this.movieForm && this.movieForm.valid) {
      this.errorMessage = '';
      this.submitEvent.emit(this.movieForm.value);
    } else {
      this.getErrorMessage();
    }
  }

  resetMovieForm() {
    if (this.movieForm) {
      this.errorMessage = '';
      this.movieForm.reset();
      this.resetEvent.emit();
    }

    this.loadMovieOptions();
  }

  getErrorMessage() {
    if (this.movieForm) {
      if (this.movieForm.controls['movieOne'] &&!this.movieForm.controls['movieOne'].value) {
        this.errorMessage = 'Movie 1 is required!';
      }
    }
  }

}
