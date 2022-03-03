import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorsService } from '../../services/autors.service';
import { Autor } from '../../interfaces/autor.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autor-modal',
  templateUrl: './autor-modal.component.html',
  styleUrls: ['./autor-modal.component.css']
})
export class AutorModalComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  authorForm!: FormGroup;

  constructor(private _fb: FormBuilder, private autorsService: AutorsService){}

  ngOnInit(): void {
      this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.authorForm = this._fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      gradoAcademico: ['', Validators.required]
    });
  }

  saveAuthor(){
    const autor: Autor = {
      nombre: this.nombre?.value,
      apellido: this.apellido?.value,
      gradoAcademico: this.gradoAcademico?.value
    }

    this.subscription.add(
      this.autorsService.postAutor(autor)
        .subscribe( () => {})
    )
  }

  get nombre(){
    return this.authorForm.get('nombre');
  }

  get apellido(){
    return this.authorForm.get('apellido');
  }

  get gradoAcademico(){
    return this.authorForm.get('gradoAcademico');
  }

}
