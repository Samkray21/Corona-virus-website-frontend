import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopService } from './services/shop.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShopCategoryComponent } from './components/shop-category/shop-category.component';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { AboutComponent } from './components/about/about.component';




const routes: Routes = [
  {path: 'shops', component: ShopListComponent},
  {path: 'category/:id', component: ShopListComponent},
  {path: 'shops/:id', component: ShopDetailsComponent},
  {path: 'search/:keyword', component: ShopListComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/shops', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];





@NgModule({
  declarations: [
    AppComponent,
    ShopListComponent,
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
    ShopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
