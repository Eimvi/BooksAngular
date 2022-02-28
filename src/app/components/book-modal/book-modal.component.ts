import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  bookForm!: FormGroup;

  selectAutor: string = '';
  selectAutorTxt: string = '';

  constructor(private _fb: FormBuilder, private booksService: BooksService){}

  ngOnInit(): void {
    this.createForm();
  }

  autors = [
    {
      name: 'Cristopher'
    },{
      name: 'Emmanuel'
    },{
      name: 'Gallegos'
    }
  ];

  createForm() {
    this.bookForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      autor: ['', Validators.required],
      dateCreated: [''],
    });
  }

  saveBook(){
    console.log('ejecutado');
  }

  selected(event: MatSelectChange){
    this.selectAutorTxt = (event.source.selected as MatOption).viewValue;
  }

}
