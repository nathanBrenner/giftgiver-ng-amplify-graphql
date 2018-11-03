import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Giver } from '../models';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'gg-giver-form',
  templateUrl: './giver-form.component.html',
  styleUrls: ['./giver-form.component.scss']
})
export class GiverFormComponent implements OnInit {
  @Output()
  saveGiver: EventEmitter<Giver> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      spouse: new FormControl('')
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const giver = { ...this.form.value, id: uuid() };
      this.saveGiver.emit(giver);
      this.form.reset({name: '', spouse: ''});
    }
  }
}
