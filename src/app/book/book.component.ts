import { Component, OnInit, Input } from '@angular/core';
import { Ibook } from '../interface/ibook';
import * as moment from 'moment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
@Input()
book:Ibook
  constructor() {
  }

  ngOnInit() {
  }

}
