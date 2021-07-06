import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/service/book.service';
import { HomeComponent } from './home.component';

const mockBooksList = [
  {
    "id": "1",
    "title": "title",
    "author": "author",
    "genre": ["genre1","genre2"],
    "publisher": "publisher",
    "stars": 1,
    "synopsis": "synopsis",
    "comments": "comments",
    "coverUrl": "coverUrl",
  },
  {
    "id": "2",
    "title": "title2",
    "author": "author2",
    "genre": ["genre1","genre2"],
    "publisher": "publisher2",
    "stars": 2,
    "synopsis": "synopsis2",
    "comments": "comments2",
    "coverUrl": "coverUrl2",
  },
  {
    "id": "3",
    "title": "title3",
    "author": "author3",
    "genre": ["genre1","genre3"],
    "publisher": "publisher3",
    "stars": 3,
    "synopsis": "synopsis3",
    "comments": "comments3",
    "coverUrl": "coverUrl3",
  }
];

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockList = mockBooksList;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        BookService,
        HttpClient,
        HttpHandler,
        Overlay,
        { provide: MatDialog, useClass: MatDialogMock },
        FormBuilder,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    bookService = TestBed.get(BookService);
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks subscribe method is getting called', fakeAsync(() => {
    let bookSpy = spyOn(bookService, 'getBooks').and.returnValue(of(mockList));
    let subSpy = spyOn(bookService.getBooks(''), 'subscribe');
    component.ngOnInit();
    tick();
    expect(bookSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }))

  it("should call getBooks and return empty books list", fakeAsync(() => {
    const response: Book[] = [];
    spyOn(bookService, 'getBooks').and.returnValue(of(response))

    component.getBooks('');
    fixture.detectChanges();

    expect(component.books).toEqual(response);
  }));

  it('should call getBooks and return list of books', fakeAsync(() => {
    let bookSpy = spyOn(bookService, 'getBooks').and.returnValue(of(mockList));

    component.ngOnInit();
    component.getBooks('');

    tick();

    expect(component.books).toBeDefined();
    expect(component.books.length).toBeGreaterThanOrEqual(3);
  }))

  it('should call getBooks and return empty array and create not found books', fakeAsync(() => {
    const response: Book[] = [];
    spyOn(bookService, 'getBooks').and.returnValue(of(response))
    component.getBooks('');

    tick();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.home-grid-not-found p').innerText).toEqual("Nenhum livro encontrado.");
  }))

  it('should call getBooks and create the app-card-book components', fakeAsync(() => {
    let bookSpy = spyOn(bookService, 'getBooks').and.returnValue(of(mockList));
    component.ngOnInit();
    component.getBooks('');

    tick();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-card-book').length).toBeGreaterThanOrEqual(3);
  }))
});
