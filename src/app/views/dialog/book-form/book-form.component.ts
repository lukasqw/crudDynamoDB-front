import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/shared/service/book.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/shared/models/book.model';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent extends BaseFormComponent implements OnInit {
  faTimes = faTimes;
  @Input('book') book?: Book;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookFormComponent>,
  ) {
    super();

  }

  ngOnInit(): void {
    this.initBookForm();
  }

  // Book Form
  initBookForm() {
    if(this.book) {
      this.dataForm = this.fb.group({
        id: this.book.id,
        title: [this.book.title, Validators.required],
        author: [this.book.author, Validators.required],
        genre: [this.book.genre, Validators.minLength(1)],
        publisher: [this.book.publisher, Validators.required],
        stars: this.book.stars,
        synopsis: this.book.synopsis,
        comments: this.book.comments,
        coverUrl: this.book.coverUrl,
      })
    } else {
      this.dataForm = this.fb.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        genre: [[], Validators.required],
        publisher: ['', Validators.required],
        stars: 1,
        synopsis: '',
        comments: '',
        coverUrl: '',
      })
    }
  }

  onCloseDialog(): void {
    this.dataForm.reset();
    this.dialogRef.close();
  }

  saveBook() {
    this.bookService.saveBook(this.dataForm.value).subscribe(res => {
      this.onCloseDialog();
    })
  }

  updateBook() {
    this.bookService.updateBook(this.dataForm.value).subscribe(res => {
      console.warn(res);
      this.onCloseDialog();
    })
  }

  submit() {
    if(this.book) {
      this.updateBook()
    } else {
      this.saveBook()
    }
  }
}
