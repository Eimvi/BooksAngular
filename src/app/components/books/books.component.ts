import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Interfaces
import { Books } from '../../interfaces/';
// Services
import { BooksService } from '../../services/books.service';
import { BookModalComponent } from '../book-modal/book-modal.component';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) order!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();

  bookData: Books[] = [];
  displayedColumns: string[] = ['title', 'description', 'autor', 'price'];


  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.books;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.paginator;
  }

  searchFilter(_event: Event): void{
    this.dataSource.filter = (_event.currentTarget as HTMLInputElement).value;
  }

  openDialog(){
    this.dialog.open(BookModalComponent,{
      width: '350px'
    });
  }

}
