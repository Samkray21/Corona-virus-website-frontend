import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Shop } from 'src/app/common/shop';
import { ShopService } from 'src/app/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/common/global';



@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-list.component.css']})


export class ShopListComponent implements OnInit {

  shops: Shop[] = [ ];
  shop: Shop = new Shop();
  currentCategoryId: number;
  global =  Global;

  items = [];
  pageOfItems: Array<Shop>;

  constructor(private _shopService: ShopService, 
              private _activatedRoute: ActivatedRoute) { }
            
    onChangePage(pageOfItems: Array<Shop>) {
        // update current page of items
        let localStorageItem = JSON.parse(localStorage.getItem('enable'));
        this.pageOfItems = pageOfItems;
        if(localStorageItem!= null){
          localStorageItem.forEach(element => {
            this.buutons(Number(element));
     });
        }
 
    }


  ngOnInit(): void {    
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listShops();
    })
    
    let localStorageItem = JSON.parse(localStorage.getItem('enable'));
    if(localStorageItem!= null){
    localStorageItem.forEach(element => {
           if (!this.global.localStorageString.includes(element)){
                 this.global.localStorageString.push(element);
        } 
      });
    }

  }

  private setLocalStorage(id) {

    this.global.localStorageString.push(String(id));
    // var field = "enable" + String(id);
    // this.global.localStorageString[field] = false;    
    localStorage.setItem('enable', JSON.stringify(this.global.localStorageString));
  }

listShops(){
  const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
  if(hasCategoryId){
    this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    this._shopService.getShops(this.currentCategoryId).subscribe(
      data => {this.shops = data;
      this.shops.forEach(element => {
        if(this.global.localStorageString.includes(String(element.id))){
          this.buutons(element.id);
        }
      });
    })
  }else{
   this._shopService.getAllShops().subscribe(
    data => {this.shops = data;
    this.buutons(null);
  })
}

}

buutons(id){
  const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

  let localStorageItem = JSON.parse(localStorage.getItem('enable'));
  let clock = setInterval(() => {
    clearInterval(clock)
    clock = null
    if (localStorageItem==null){
    }else if(!hasCategoryId){
      localStorageItem.forEach(element => {
           if (!this.global.localStorageString.includes(element)){
                 this.global.localStorageString.push(element);
        }
         this.disableButton(Number(element));
      });

    }else{
      this.disableButton(Number(id));
    }

}, 200)
}

like(id) {
  // this.setLocalStorage(id);
  let localStorageItem = JSON.parse(localStorage.getItem('enable'));
  this.disableButton(id);
 new Promise((resolve, reject) => {
  this._shopService.get(id).subscribe(
    data => {this.shop = data;
      document.getElementById('shoplikes' + String(this.shop.id)).innerHTML = String(this.shop.likes + 1);
      this.setLocalStorage(this.shop.id);
      this.shop.likes = this.shop.likes + 1;
      this._shopService.updateLikeCounter(this.shop, this.shop.id);
    }
  )}
  );
}

dislike(id) {
  this.disableButton(id);
  new Promise((resolve, reject) => {
  this._shopService.get(id).subscribe(
    data => {this.shop = data;
      document.getElementById('shopdislikeslikes' + String(this.shop.id)).innerHTML = String(this.shop.dislike + 1);
      this.setLocalStorage(this.shop.id);
      this.shop.dislike = this.shop.dislike + 1;
      this._shopService.updateLikeCounter(this.shop, this.shop.id);
    }
  )
  });
}

disableButton(id){
  var likeButton = document.getElementById("like" + String(id));
  var dislikeButton = document.getElementById("dislike" + String(id));
  if (!(dislikeButton == null)){
    dislikeButton.style.opacity = "0.2";
    dislikeButton.style.pointerEvents = "none";
    likeButton.style.opacity = "0.2";
    likeButton.style.pointerEvents = "none";
  }
}
}
