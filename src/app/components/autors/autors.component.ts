import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Interfaces
import { Autor } from '../../interfaces/autor.interface';
// Services
import { AutorsService } from '../../services/autors.service';
// Components
import { AutorModalComponent } from '../autor-modal/autor-modal.component';
import { PaginationAutors } from 'src/app/interfaces';

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

  timeout: any = null;
  totalAutors: number = 0;
  autorsPorPagina: number = 5;
  paginaCombo: number[] = [1, 2, 5, 10];
  paginaActual: number = 1;
  sort: string = 'nombre';
  sortDirection: string = 'asc';
  filterValue!: any;

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

  searchFilter(_event: any): void{
    // this.dataSource.filter = (_event.currentTarget as HTMLInputElement).value;
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(() => {
      if(_event.keyCode){
        const filterValue = {
          propiedad: 'nombre',
          valor: _event.target.value
        }
        $this.filterValue = filterValue;
        $this.getDataPagination();
      }
    },1000);
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

    /* Get Data with events table */
  eventPagination(event: PageEvent): void{
    this.autorsPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.getDataPagination();
  }

  orderColumn(event: any){
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.getDataPagination();
  }

  getAutors(): void{
    this.subscription.add(
      this.autorsService.getAutors()
        .subscribe( (autors: Autor[]) => {
          this.dataSource.data = autors;
        })
    )
  }

  getDataPagination(): void{
    this.subscription.add(
      this.autorsService.getAutorsPagination(this.autorsPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue)
          .subscribe( (pagination: PaginationAutors) => {
            this.dataSource = new MatTableDataSource<Autor>(pagination.data);
            this.totalAutors = pagination.totalRows;
          })
    )
  }

}
