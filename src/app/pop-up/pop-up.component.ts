import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ibook } from '../interface/ibook';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  selected: Ibook;
  profileForm: FormGroup
  flage: boolean;
  isSaved = false;
  isError = false;
  isErrorletter: boolean;
  @Output()
  deletebook: EventEmitter<Ibook> = new EventEmitter<Ibook>()
  @Output()
  savebook: EventEmitter<Ibook> = new EventEmitter<Ibook>()

  constructor(public service: ServiceService, private fb: FormBuilder) {
    this.creteForm()
  }
  creteForm() {

    var date = Intl.DateTimeFormat('en-US').format(new Date(this.service.getSelectedBook().Published));
    this.service.getSelectedBook().Published = date;
    this.profileForm = this.fb.group({
      authors: [this.service.getSelectedBook().authors, Validators.required],
      Published: [this.service.getSelectedBook().Published],
      pic: [this.service.getSelectedBook().pic],
      title: [this.service.getSelectedBook().title, Validators.required]
    });
  }
  save(ngForm) {

    if (this.service.getflag() == false) {
      this.deletebook.emit(this.service.getSelectedBook());
      this.isSaved = true;

    }
    else {
      ngForm.value['Published'] = Intl.DateTimeFormat('en-US').format(new Date(ngForm.value['Published']))
      ngForm.value['id'] = this.service.getSelectedBook().id;
      if (new Date(ngForm.value['Published']) < new Date()) {
        this.savebook.emit(ngForm.value);

        this.isSaved = true;
        this.isError = false;

      }
      else {
        this.isError = true;
        this.isSaved = false;
      }

    }

    this.creteForm()
  }
  cancel() {
    this.isSaved = false;

  }
  ngOnInit() { }

}

