import { BookService } from 'src/app/shared/service/book.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { faStar, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from 'src/app/views/dialog/book-form/book-form.component';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss']
})
export class CardBookComponent implements OnInit {
  faStar = faStar;
  faTrash = faTrash;
  faPen = faPen;

  @Input("book")
  book!: Book;

  @Output() listBookUpdate: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
  }

  bookDelete(id: string){
    this.bookService.deleteBooks(id).subscribe(result => {
      this.listBookUpdate.emit();
    });
  }

  openNewBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '800px'
    });

    dialogRef.componentInstance.book = book;

    dialogRef.afterClosed().subscribe(result => {
      this.listBookUpdate.emit();
    });
  }
}
