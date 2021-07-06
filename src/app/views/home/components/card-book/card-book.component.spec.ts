import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';

import { CardBookComponent } from './card-book.component';

const mockBook = {
  "id": "1",
  "title": "title",
  "author": "author",
  "genre": ["genre1","genre2"],
  "publisher": "publisher",
  "stars": 1,
  "synopsis": "synopsis",
  "comments": "comments",
  "coverUrl": "coverUrl1",
}

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

describe('CardBookComponent', () => {
  let component: CardBookComponent;
  let fixture: ComponentFixture<CardBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBookComponent ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        HttpClient,
        HttpHandler,
        FontAwesomeModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBookComponent);
    component = fixture.componentInstance;
    component.book = mockBook;
    fixture.detectChanges();
  });

  it('should create CardBookComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create title element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.card-book-title p')[0].innerText).toEqual("title");
  });

  it('should create author element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.card-book-title p')[1].innerText).toEqual("author");
  });

  it('should create stars element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-book-stars p').innerText).toEqual("1");
  });
});
