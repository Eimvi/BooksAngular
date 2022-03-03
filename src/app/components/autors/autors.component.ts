import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Interfaces
import { Autor } from '../../interfaces/autor.interface';
// Services
import { AutorsService } from '../../services/autors.service';
// Components
import { AutorModalComponent } from '../autor-modal/autor-modal.component';

@Component({
  selector: 'app-autors',
  templateUrl: './autors.component.html',
  styleUrls: ['./autors.component.css']
})
export class AutorsComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription = new Subscription();

  @ViewChild(MatSort) order!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Autor>();
  displayedColumns: string[] = ['nombre', 'apellido', 'gradoAcademico'];

  constructor(private autorsService: AutorsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAutors();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchFilter(_event: Event): void{
    this.dataSource.filter = (_event.currentTarget as HTMLInputElement).value;
  }

  openDialog(){
    const dialogRef = this.dialog.open(AutorModalComponent,{
      width: '350px'
    });

    dialogRef.afterClosed()
    .subscribe( () => {

      this.getAutors();
    })
  }

  getAutors(): void{
    this.subscription.add(
      this.autorsService.getAutors()
        .subscribe( (autors: Autor[]) => {
          this.dataSource.data = autors;
        })
    )
  }

}
