import { Injectable } from '@angular/core';
import { Autor } from '../interfaces/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class AutorsService {

  private authorsList: Autor[] = [
    { authorId: 1, name: 'Cris', lastname: 'Gallegos', gradoAcademico: 'Ing'},
    { authorId: 2, name: 'Emma', lastname: 'Modesto', gradoAcademico: 'Ing'}
  ]

  constructor() { }

  get authors(){
    return this.authorsList.slice();
  }
}
