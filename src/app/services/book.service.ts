import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Shop } from '../common/shop';
import { ShopCategory } from '../common/shop-category';
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class BookService {

private baseUrl = "http://localhost:8080/api/v1/books";
private categoryUrl = "http://localhost:8080/api/v1/books-category";



  constructor(private httpClient: HttpClient) {
   
   }

  getBooks(theCategoryId: number): Observable<Shop[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books.sort((a1: Shop, a2: Shop) => a2.likes - a1.likes ))
    );
  }

  getAllBooks(): Observable<Shop[]>{
    const searchUrl = `${this.baseUrl}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books.sort((a1: Shop, a2: Shop) => a2.likes - a1.likes ))
    );
  }

getBookCategories(): Observable<ShopCategory[]>{
  return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.bookCategory)
  );

}

get(bookId: number): Observable<Shop> {
  const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
  return this.httpClient.get<Shop>(bookDetailsUrl);
}

updateLikeCounter(shop, id) {
  return new Promise((resolve, reject) => {
  
  const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

  this.httpClient.put(`${this.baseUrl}/${id}`,
    shop,
    {headers})
    .subscribe(
        val => {
            console.log("PUT call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        }
    );

  });  
}


}

interface GetResponseBooks{
  _embedded: {
    books: Shop[];
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCategory: ShopCategory[];
  }
}

