import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/common/shop';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  shop: Shop = new Shop();

  constructor(private _activatedRoute: ActivatedRoute,
              private _shopService: ShopService,
              private _location: Location) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getShopInfo();
      }
    )
  }

  backClicked() {
    this._location.back();
  }


  getShopInfo(){

    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._shopService.get(id).subscribe(
        data => {this.shop = data;
        console.log(data);}
      )


  }

}