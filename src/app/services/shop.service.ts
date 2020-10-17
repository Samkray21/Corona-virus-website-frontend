import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Shop } from '../common/shop';
import { ShopCategory } from '../common/shop-category';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

private baseUrl = "https://corona-support-spring.herokuapp.com/api/v1/shops";
private categoryUrl = "https://corona-support-spring.herokuapp.com/api/v1/shop-category";



  constructor(private httpClient: HttpClient) {
   
   }

  getShops(theCategoryId: number): Observable<Shop[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseShops>(searchUrl).pipe(
      map(response => response._embedded.shops.sort((a1: Shop, a2: Shop) => a2.likes - a1.likes ))
    );
  }

  getAllShops(): Observable<Shop[]>{
    const searchUrl = `${this.baseUrl}`;
    return this.httpClient.get<GetResponseShops>(searchUrl).pipe(
      map(response => response._embedded.shops.sort((a1: Shop, a2: Shop) => a2.likes - a1.likes ))
    );
  }

getShopCategories(): Observable<ShopCategory[]>{
  return this.httpClient.get<GetResponseShopCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.shopCategory)
  );

}

get(shopId: number): Observable<Shop> {
  const shopDetailsUrl = `${this.baseUrl}/${shopId}`;
  return this.httpClient.get<Shop>(shopDetailsUrl);
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

interface GetResponseShops{
  _embedded: {
    shops: Shop[];
  }
}

interface GetResponseShopCategory{
  _embedded: {
    shopCategory: ShopCategory[];
  }
}

