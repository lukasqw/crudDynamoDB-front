import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: String = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getBooks(title?: String): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books${title ? "/" + title : ''}`)
  }

  public saveBook(book: any): Observable<Book> {
    return this.http.post<any>(`${this.baseUrl}/book`, book, this.httpOptions);
  }

  public updateBook(book: any): Observable<Book> {
    return this.http.put<any>(`${this.baseUrl}/book/${book.id}`, book, this.httpOptions);
  }

  public deleteBooks(id: String): Observable<any> {
    return this.http.delete<Book[]>(`${this.baseUrl}/book/${id}`)
  }
}
