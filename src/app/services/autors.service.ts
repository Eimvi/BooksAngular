import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../interfaces/autor.interface';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorsService {

  private readonly URL: string = environment.baseUrl;

  private authorsList: Autor[] = []

  constructor(private http: HttpClient) { }

  get authors(){
    return this.authorsList.slice();
  }

  getAutors(): Observable<Autor[]>{
    return this.http.get<Autor[]>(`${this.URL}LibreriaAutor`);
  }

  postAutor(autor: Autor){
    return this.http.post<any>(`${this.URL}LibreriaAutor`, autor);
  }
}
