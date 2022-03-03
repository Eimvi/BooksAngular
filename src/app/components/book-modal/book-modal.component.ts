import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

import { Subscription } from 'rxjs';
// Material
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
// Service
import { BooksService } from '../../services/books.service';
import { AutorsService } from '../../services/autors.service';
// Interface
import { Autor } from '../../interfaces/autor.interface';
import { Books } from '../../interfaces/books.interface';


@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  bookForm!: FormGroup;

  selectAutor: string = '';
  selectAutorTxt: string = '';
  autors: Autor[] = [];

  constructor(private _fb: FormBuilder,
              private booksService: BooksService,
              private autorsService: AutorsService){}

  ngOnInit(): void {
    this.createForm();
    this.getAutors();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.bookForm = this._fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      autor: ['', Validators.required],
      fechaPublicacion: [''],
    });
  }

  saveBook(){

    const autor = {
      id: this.autor?.value
    }

    const book: Books = {
      titulo: this.titulo?.value,
      descripcion: this.descripcion?.value,
      precio: this.precio?.value,
      autor: autor,
      fechaPublicacion: this.fechaPublicacion?.value
    }

    this.subscription.add(
      this.booksService.postBook(book)
        .subscribe(() => {})
    )
  }

  selected(event: MatSelectChange){
    this.selectAutorTxt = (event.source.selected as MatOption).viewValue;
  }

  getAutors(): void{
    this.subscription.add(
      this.autorsService.getAutors()
        .subscribe( (autors) => {
          this.autors = autors;
        } )
    )
  }

  get titulo(){
    return this.bookForm.get('titulo');
  }

  get descripcion(){
    return this.bookForm.get('descripcion');
  }

  get precio(){
    return this.bookForm.get('precio');
  }

  get autor(){
    return this.bookForm.get('autor');
  }

  get fechaPublicacion(){
    return this.bookForm.get('fechaPublicacion');
  }

}
