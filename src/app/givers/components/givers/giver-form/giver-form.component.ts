import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Giver } from '../../../models';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'gg-giver-form',
  templateUrl: './giver-form.component.html',
  styleUrls: ['./giver-form.component.scss']
})
export class GiverFormComponent implements OnInit {
  @Input()
  givers: Giver[];

  @Input()
  showGiverList: boolean;

  @Output()
  saveGiver: EventEmitter<Giver> = new EventEmitter();

  @Output()
  toggleGiverList: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  configActionGrid() {
    return { 'grid-template-columns': this.canCreateGroup() ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)' };
  }

  canCreateGroup(): boolean {
    return this.givers.length > 2 && !(this.givers.length % 2);
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
      this.form.setValue({name: '', spouse: ''});
    }
  }
}
