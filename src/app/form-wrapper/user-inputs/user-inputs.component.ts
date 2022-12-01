import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {

  movieForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.movieForm = this.fb.group({
      movieOne: '',
      movieTwo: '',
      movieThree: ''
    });
  }

  submitMovieForm() {
    console.log(this.movieForm.value);
  }

}
