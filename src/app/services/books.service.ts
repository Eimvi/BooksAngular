import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { PaginationBooks } from '../interfaces/pagination-books.interface';
import { Books } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly URL: string = environment.baseUrl;

  bookSubject: Subject<Books> = new Subject<Books>();

  private booksList: Books[] = []

  constructor(private http: HttpClient) { }

  get books(){
    return this.booksList;
  }

  getBooks(){
    return this.http.get<Books[]>(`${this.URL}libro`);
  }

  saveBook(book: Books){
    this.booksList.push(book);
    this.bookSubject.next(book);
  }

  getBooksPagination(libroPorPagina: number,
                     paginaActual: number,
                     sort: string, sortDirection:
                     string, filterValue: any){

      const req = {
        pageSize: libroPorPagina,
        page: paginaActual,
        sort,
        sortDirection,
        filterValue
      };

      return this.http.post<PaginationBooks>(`${this.URL}libro/pagination`, req);

  }

  postBook(book: Books){
    return this.http.post<any>(`${this.URL}libro`, book);
  }
}
