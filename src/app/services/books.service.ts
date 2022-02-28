import { Injectable } from '@angular/core';
import { Books } from '../interfaces/books.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  bookSubject: Subject<Books> = new Subject<Books>();

  private booksList: Books[] = [
    { bookId: 1, title: 'Algoritmos', description: 'Basic', autor: 'Cristopher', price: 1000 },
    { bookId: 2, title: 'Bases', description: 'Advanced', autor: 'Abelicia', price: 2000 },
    { bookId: 3, title: 'Algoritmos', description: 'Basic', autor: 'Cristopher', price: 1000 },
    { bookId: 4, title: 'Bases', description: 'Advanced', autor: 'Abelicia', price: 2000 },
    { bookId: 5, title: 'Algoritmos', description: 'Basic', autor: 'Cristopher', price: 1000 },
    { bookId: 6, title: 'Bases', description: 'Advanced', autor: 'Abelicia', price: 2000 },
    { bookId: 7, title: 'Algoritmos', description: 'Basic', autor: 'Cristopher', price: 1000 },
    { bookId: 8, title: 'Bases', description: 'Advanced', autor: 'Abelicia', price: 2000 },
    { bookId: 9, title: 'Algoritmos', description: 'Basic', autor: 'Cristopher', price: 1000 },
    { bookId: 10, title: 'Bases', description: 'Advanced', autor: 'Abelicia', price: 2000 },
    { bookId: 11, title: 'Algoritmos', description: 'Basic', autor: 'Cristopher', price: 1000 },
    { bookId: 12, title: 'Bases', description: 'Advanced', autor: 'Abelicia', price: 2000 },
  ]

  constructor() { }

  get books(){
    return this.booksList;
  }

  saveBook(book: Books){
    this.booksList.push(book);
    this.bookSubject.next(book);
  }
}
