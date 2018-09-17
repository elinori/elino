import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Ibook } from '../interface/ibook';
import { FilterPipe } from '../filter/filter.pipe';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  profileForm: FormGroup
  isSaved = false;
  isError = false;
  errormsg = false;

  @Input()
  books: Ibook[]
  constructor(private service: ServiceService, private fb: FormBuilder) {

    this.createForm();
  }

  @Output()
  add: EventEmitter<Ibook> = new EventEmitter<Ibook>()

  createForm() {

    this.profileForm = this.fb.group({
      authors: [''],
      Published: [''],
      pic: [""],
      title: [''],
      id: ['', Validators.required]
    });
  }

  saveBook(ngform) {

    ngform.value['Published'] = Intl.DateTimeFormat('en-US').format(new Date(ngform.value['Published']))
    ngform.value['title'] = new FilterPipe().transform(ngform.value['title']);
    var found = this.books.find(function (element) {
      element.title = new FilterPipe().transform(element.title);
      if (element.title.trim() === ngform.value['title'].trim()) {
        return true;
      }
    });
    if (!found) {
      if (new Date(ngform.value['Published']) < new Date()) {

        this.add.emit(ngform.value);
        this.isSaved = true;
        this.isError = false;
        this.errormsg = false;;

      }
      else {

        this.errormsg = true;
        this.isSaved = false;
        this.isError = false
      }

    }
    else {
      this.isSaved = false;
      this.isError = true;
      this.errormsg = false;

    }
    this.createForm();

  }
  cancel() {
    this.isSaved = false;
    this.isError = false;
    this.errormsg = false;
  
  }
  ngOnInit() {

  }

}
