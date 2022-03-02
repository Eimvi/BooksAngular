import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../../interfaces/autor.interface';
import { AutorsService } from '../../services/autors.service';
import { AutorModalComponent } from '../autor-modal/autor-modal.component';

@Component({
  selector: 'app-autors',
  templateUrl: './autors.component.html',
  styleUrls: ['./autors.component.css']
})
export class AutorsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) order!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Autor>();
  displayedColumns: string[] = ['name', 'lastname', 'gradoAcademico'];
  constructor(private autorsService: AutorsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.autorsService.authors;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.paginator;
  }

  searchFilter(_event: Event): void{
    this.dataSource.filter = (_event.currentTarget as HTMLInputElement).value;
  }

  openDialog(){
    this.dialog.open(AutorModalComponent,{
      width: '350px'
    });
  }

}
