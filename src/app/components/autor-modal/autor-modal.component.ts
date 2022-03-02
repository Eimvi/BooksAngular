import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { AutorsService } from '../../services/autors.service';

@Component({
  selector: 'app-autor-modal',
  templateUrl: './autor-modal.component.html',
  styleUrls: ['./autor-modal.component.css']
})
export class AutorModalComponent implements OnInit {

  authorForm!: FormGroup;

  selectAutor: string = '';

  constructor(private _fb: FormBuilder, private autorsService: AutorsService){}

  ngOnInit(): void {
      this.createForm();
  }

  createForm() {
    this.authorForm = this._fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      gradoAcademico: ['', Validators.required]
    });
  }

  saveAuthor(){
    console.log('ejecutado');
  }

}
