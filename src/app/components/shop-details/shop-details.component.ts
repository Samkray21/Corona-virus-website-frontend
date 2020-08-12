import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/common/shop';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  shop: Shop = new Shop();

  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,
              private _location: Location) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }

  backClicked() {
    this._location.back();
  }


  getBookInfo(){

    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._bookService.get(id).subscribe(
        data => {this.shop = data;
        console.log(data);}
      )


  }

}