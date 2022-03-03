import { Books } from "./books.interface";

export interface PaginationBooks {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  data: Books[];
  filterValue: {};
  totalRows: number;
}
