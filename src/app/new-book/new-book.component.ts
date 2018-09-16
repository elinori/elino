import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Ibook } from '../interface/ibook';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  profileForm: FormGroup
  pattern = "[a-zA-Z][a-zA-Z ]+";
  date_regex = "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])";

  constructor(private service: ServiceService, private fb: FormBuilder) {

    this.createForm();
  }

  @Output()
  add: EventEmitter<Ibook> = new EventEmitter<Ibook>()

  createForm() {

    this.profileForm = this.fb.group({
      authors: [''],
      Published: ['', Validators.pattern(this.date_regex)],
      pic: [""],
      title: ['', Validators.pattern(this.pattern)],
      id: ['', Validators.required]
    });
  }

  saveBook(ngform) {
    ngform.value['Published'] = Intl.DateTimeFormat('en-US').format(new Date(ngform.value['Published']))

    this.add.emit(ngform.value);
    this.createForm();
  }
  ngOnInit() {

  }

}
