import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Ibook } from '../interface/ibook';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  selectedBook: Ibook;
  save: Ibook;
  flage: boolean;
  constructor(private http: Http) { }

  getAllBooks(): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=quilting').pipe(
      map(x => x.json()

      )
    )
  }

  setselectedBook(book: Ibook, flage: boolean) {
    this.selectedBook = book;
    this.flage = flage;
  }

  getSelectedBook() {
    return this.selectedBook;
  }

  getflag() {
    return this.flage;
  }

  savebook(book: Ibook) {
    this.save = book;
  }

}
