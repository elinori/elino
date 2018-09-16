import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, NgControl } from '@angular/forms';
import * as moment from 'moment';
import { Ibook } from '../interface/ibook';
import { FilterPipe } from '../filter/filter.pipe';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Ibook[] = [];
  panelOpenState = false;
  isEdite = false;
  selctedBook: Ibook;
  profileForm: FormGroup
  selectedRow: any;
  isshow = false;
  mySelected: Ibook;
  isSaved = false;
  isError = false;
  new = false;
  patternForString = "[a-zA-Z][a-zA-Z ]+";
  date_regex = "^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$";

  constructor(private service: ServiceService, private fb: FormBuilder) {
    service.getAllBooks().subscribe(x => {
      x['items'].forEach(element => {
        element['volumeInfo']['title'] = new FilterPipe().transform(element['volumeInfo']['title']);
        this.books.push({ id: element['id'], authors: element['volumeInfo']['authors'], Published: element['volumeInfo']['publishedDate'], title: element['volumeInfo']['title'], pic: element['volumeInfo']['imageLinks']['smallThumbnail'] })

      })
      this.creteForm();
    })
  }

  deleteBook(event) {
    for (var i = this.books.length - 1; i >= 0; i--) {
      if (this.books[i].title === event.title) {
        this.books.splice(i, 1);
      }
    }
    this.isSaved = true;
    this.isError = false;
  }
  add() {
    this.new = true;
    this.isEdite = false;
  }
  saveBook(event) {
    this.books.forEach(element => {
      if (event['id'] == element.id) {
        element.title = event['title'];
        element.Published = event['Published'];
        element.authors = event['authors'];

      }
    });

    this.isSaved = true;
    this.isError = false;
  }
  addbook(event) {
    this.new = true;
    event.title = new FilterPipe().transform(event.title);
    var found = this.books.find(function (element) {
      element.title = new FilterPipe().transform(element.title);
      if (element.title.trim() === event.title.trim()) {
        return true;
      }

    });
    if (!found) {
      this.books.push(event);
      this.isSaved = true;
      this.isError = false;

    } else {
      this.isSaved = false;
      this.isError = true;

    }

  }

  editBook(book, flage) {
    this.isEdite = true;
    this.service.setselectedBook(book, flage);
  }

  delete(book: Ibook, flage) {
    this.isEdite = true;
    this.service.setselectedBook(book, flage);
  }
  setClickedRow = function (index) {
    this.selectedRow = index;
  }
  creteForm() {
    this.books.forEach(element => {
      var date = Intl.DateTimeFormat('en-US').format(new Date(element.Published)); // Australian date format: "8/10/2010" 
      element.Published = date
      this.profileForm = this.fb.group({
        authors: ['', Validators.pattern(this.patternForString)],
        Published: ['', Validators.pattern(this.date_regex)],
        pic: [''],
        title: [''],
        id: ['']
      });
    });
  }

  ngOnInit() {

  }

}


