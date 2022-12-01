import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {

  movieForm: FormGroup;

  @Output() submitEvent = new EventEmitter<any>();
  @Output() resetEvent = new EventEmitter<any>();


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.movieForm = this.fb.group({
      movieOne: '',
      movieTwo: '',
      movieThree: ''
    });
  }

  submitMovieForm() {
    if (this.movieForm && this.movieForm.valid) {
      this.submitEvent.emit(this.movieForm.value);
    }
  }

  resetMovieForm() {
    if (this.movieForm) {
      this.movieForm.reset();
      this.resetEvent.emit();
    }
  }

}
