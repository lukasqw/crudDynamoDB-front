import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverBookComponent } from './cover-book.component';

describe('CoverBookComponent', () => {
  let component: CoverBookComponent;
  let fixture: ComponentFixture<CoverBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CoverBookComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create Title element', () => {
    component.title = "Title test";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.cover-book p').innerText).toEqual(component.title);
  });

  it('should create img element', () => {
    component.coverUrl = "http://teste.png";
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.cover-book img')).toBeTruthy();
  });
});
