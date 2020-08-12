import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShopCategoryComponent } from './components/shop-category/shop-category.component';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AboutComponent } from './components/about/about.component';




const routes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},
  {path: 'books/:id', component: ShopDetailsComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];





@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    ShopCategoryComponent,
    ShopDetailsComponent,
    AboutComponent
        ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DropDownsModule,
    BrowserAnimationsModule,
    JwPaginationModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
