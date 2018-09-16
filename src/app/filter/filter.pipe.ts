import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'englishWordFilter'
})
export class FilterPipe implements PipeTransform {
  transform(word: string) {
    if (word) {
      var result = "";
      word = word.toLowerCase();
      var cleanWord = word.replace(/[^a-z ]/g, "");
      var splitWord = cleanWord.split(" ");
      for (var i = splitWord.length; i--;) {
        var splitResult = splitWord[i].charAt(0).toUpperCase();
        result = splitWord[i].substring(0).replace(splitWord[i].charAt(0), splitResult) + " " + result;
      }
      return result;
    }
  }
}


// angular.module('booksApp.filter',[])
//   .filter('englishWordFilter',englishWordFilter);

