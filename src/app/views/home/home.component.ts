import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/service/book.service';
import { faPlus, faFrown } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { BookFormComponent } from '../dialog/book-form/book-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlus = faPlus;
  faFrown = faFrown;

  books: Book[] = [];
  searchText: String = '';

  constructor(
    public bookService: BookService,
    public dialog: MatDialog,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getBooks('');
  }

  getBooks(title: String) {
    this.bookService.getBooks(title).subscribe((data) => {
      this.books = data.sort(this.sortBooksByTitle);
      }, (error) => {
      console.log(error);
      });
  }

  openNewBookDialog(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks('');
    });
  }

  sortBooksByTitle(a: any, b: any) {
    // Use toUpperCase() to ignore character casing
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }
}
