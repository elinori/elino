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
  pattern = "[a-zA-Z][a-zA-Z ]+";
  date_regex = "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])";
  isSaved=false;
  isError=false;

  @Input()
  books:Ibook[]
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
   ngform.value['title'] = new FilterPipe().transform(ngform.value['title']);
 var found = this.books.find(function (element) {
   element.title = new FilterPipe().transform(element.title);
  if (element.title.trim() === ngform.value['title'].trim()) {
     return true;
  }
});
 if (!found) {
  this.add.emit(ngform.value);
  this.isSaved=true;
  this.isError=false;


//   this.books.push(event);
//   this.isError = false;

// } else {
//   

 }
 else{
    this.isSaved=false;
    this.isError=true;

 }

    this.createForm();

  }
  cancel(){
    this.isSaved=false;

  }
  ngOnInit() {

  }

}
