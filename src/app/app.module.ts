import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatNativeDateModule, MatSliderModule, DateAdapter} from '@angular/material';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CustomFormsModule } from 'ngx-custom-validators';

import {MatListModule} from '@angular/material/list';
import { HttpModule } from '@angular/http';
import { BooksComponent } from './books/books.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
 import {MatInputModule} from '@angular/material/input';
import { PopUpComponent } from './pop-up/pop-up.component';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NewBookComponent } from './new-book/new-book.component';
import { FilterPipe } from './filter/filter.pipe';
import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    PopUpComponent,
    NewBookComponent,
    FilterPipe,
    BookComponent
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    NoopAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatListModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
