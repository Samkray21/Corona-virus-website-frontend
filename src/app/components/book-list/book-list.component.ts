import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Shop } from 'src/app/common/shop';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/common/global';
import { THIS_EXPR, ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { JwPaginationComponent } from 'jw-angular-pagination';


@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']})


export class BookListComponent implements OnInit {

  shops: Shop[] = [ ];
  shop: Shop = new Shop();
  currentCategoryId: number;
  global =  Global;

  items = [];
  pageOfItems: Array<Shop>;

  constructor(private _bookService: BookService, 
              private _activatedRoute: ActivatedRoute) { }
            
    onChangePage(pageOfItems: Array<Shop>) {
        // update current page of items
        let localStorageItem = JSON.parse(localStorage.getItem('enable'));
        this.pageOfItems = pageOfItems;
        localStorageItem.forEach(element => {
            this.buutons(Number(element));
     });
    }


  ngOnInit(): void {    

    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })

    let localStorageItem = JSON.parse(localStorage.getItem('enable'));

    localStorageItem.forEach(element => {
           if (!this.global.localStorageString.includes(element)){
                 this.global.localStorageString.push(element);
        } 
      });

  }

  private setLocalStorage(id) {

    this.global.localStorageString.push(String(id));
    // var field = "enable" + String(id);
    // this.global.localStorageString[field] = false;    
    localStorage.setItem('enable', JSON.stringify(this.global.localStorageString));
  }

listBooks(){
  const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
  if(hasCategoryId){
    this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookService.getBooks(this.currentCategoryId).subscribe(
      data => {this.shops = data;
      console.log(data);
      this.shops.forEach(element => {
        console.log(this.global.localStorageString);
        console.log(String(element.id));

        if(this.global.localStorageString.includes(String(element.id))){
          console.log(this.global.localStorageString.includes(String(element.id)));
          this.buutons(element.id);
        }
      });
    })
  }else{
   this._bookService.getAllBooks().subscribe(
    data => {this.shops = data;
    console.log(data);
  
    this.buutons(null);
  })
}

}

buutons(id){
  ///const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
  const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

  let localStorageItem = JSON.parse(localStorage.getItem('enable'));
  let clock = setInterval(() => {
    clearInterval(clock)
    clock = null
    if (localStorageItem==null){
    }else if(!hasCategoryId){
      localStorageItem.forEach(element => {
      console.log(localStorageItem);
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
  console.log(localStorageItem);
  this.disableButton(id);
 new Promise((resolve, reject) => {
  this._bookService.get(id).subscribe(
    data => {this.shop = data;
      //this.global.localStorageString.push(this.book.id);
      document.getElementById('shoplikes' + String(this.shop.id)).innerHTML = String(this.shop.likes + 1);
      this.setLocalStorage(this.shop.id);
      this.shop.likes = this.shop.likes + 1;
      this._bookService.updateLikeCounter(this.shop, this.shop.id);
    }
  )}
  );
}

dislike(id) {
  this.disableButton(id);
  new Promise((resolve, reject) => {
  this._bookService.get(id).subscribe(
    data => {this.shop = data;
      //this.global.localStorageString.push(this.book.id);
      document.getElementById('shopdislikeslikes' + String(this.shop.id)).innerHTML = String(this.shop.dislike + 1);
      this.setLocalStorage(this.shop.id);
      this.shop.dislike = this.shop.dislike + 1;
      this._bookService.updateLikeCounter(this.shop, this.shop.id);
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
