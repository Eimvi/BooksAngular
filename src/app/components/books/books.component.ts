import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// Interfaces
import { Books } from '../../interfaces/';
// Services
import { BooksService } from '../../services/books.service';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { PaginationBooks } from '../../interfaces/pagination-books.interface';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

  subscription: Subscription = new Subscription();

  /* Set Sort and Pagination */
  @ViewChild(MatSort) order!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Books>();

  totalBooks: number = 0;
  librosPorPagina: number = 2;
  paginaCombo: number[] = [1, 2, 5, 10];
  paginaActual: number = 1;
  sort: string = 'titulo';
  sortDirection: string = 'asc';
  filterValue = null;

  displayedColumns: string[] = ['titulo', 'descripcion', 'autor', 'precio'];

  /* Inyect Services */
  constructor(private booksService: BooksService,
              private bookService: BooksService,
              private dialog: MatDialog) { }

  /* Get initial backend data and set default pagination */
  ngOnInit(): void {
    this.dataSource.data = this.booksService.books;
    this.getDataPagination();
  }

  /* Destroy subscription */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.order;
    this.dataSource.paginator = this.paginator;
  }

  /* Filter Data with DataSource Table */
  searchFilter(_event: Event): void{
    this.dataSource.filter = (_event.currentTarget as HTMLInputElement).value;
  }

  /* Update Modal */
  openDialog(): void{
    const dialogRef = this.dialog.open(BookModalComponent,{
      width: '350px'
    });

    dialogRef.afterClosed()
      .subscribe( () => {

        this.getDataPagination();
      })
  }

  /* Get Data with events table */
  eventPagination(event: PageEvent): void{
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.getDataPagination();
  }

  /* Update Table with Pagination Backend */
  getDataPagination(): void{
    this.subscription.add(
      this.booksService.getBooksPagination(this.librosPorPagina,
        this.paginaActual,
        this.sort,
        this.sortDirection,
        this.filterValue)
          .subscribe( (pagination: PaginationBooks) => {
            this.dataSource = new MatTableDataSource<Books>(pagination.data);
            this.totalBooks = pagination.totalRows;
          })
    )
  }

}
