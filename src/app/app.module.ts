import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { DealerComponent } from './dealer/dealer.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { SetpriceComponent } from './setprice/setprice.component';
import { SetcostComponent } from './setcost/setcost.component';
import { DealerproductsComponent } from './dealerproducts/dealerproducts.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { GetordersComponent } from './getorders/getorders.component';
import { BuyproductComponent } from './buyproduct/buyproduct.component';
import { GetpaymentsComponent } from './getpayments/getpayments.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpdatedealerproductComponent } from './updatedealerproduct/updatedealerproduct.component';
import { UpdatemanufacturerComponent } from './updatemanufacturer/updatemanufacturer.component';
import { UnauthorizedaccessComponent } from './unauthorizedaccess/unauthorizedaccess.component';
import { HttpInterceptorBasicAuthService } from './http-interceptor-basic-auth.service';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { PaymentComponent } from './payment/payment.component';
import { GetProductsComponent } from './get-products/get-products.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatCheckboxModule, MatButtonModule } from 'node_modules/@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ManufacturerComponent,
    DealerComponent,
    CustomerComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ProductsComponent,
    UpdateproductComponent,
    SetpriceComponent,
    SetcostComponent,
    DealerproductsComponent,
    PlaceorderComponent,
    GetordersComponent,
    BuyproductComponent,
    GetpaymentsComponent,
    UpdatedealerproductComponent,
    UpdatemanufacturerComponent,
    UnauthorizedaccessComponent,
    AddtocartComponent,
    PaymentComponent,
    GetProductsComponent,
    AddProdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'storesapp', component: HomeComponent},
      { path: 'pay', component: PaymentComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'login', component: LoginComponent},
      { path: 'getpayments', component: GetpaymentsComponent},
      { path : 'setcost', component: SetcostComponent},
      { path : 'setprice', component: SetpriceComponent},
      { path : 'placeorder', component: PlaceorderComponent},
      { path : 'buyproduct', component: BuyproductComponent},
      { path : 'getdealprods', component: DealerproductsComponent},
      { path : 'products', component: ProductsComponent, children: [
        { path : 'getproducts', component: GetProductsComponent},
        { path: 'addProduct', component: AddProdComponent}
      ]},
      { path: 'updateproduct', component: UpdateproductComponent},
      { path: 'dealer', component: DealerComponent },
      { path : 'customer', component: CustomerComponent },
      { path : 'updatedealerprod' , component: UpdatedealerproductComponent },
      { path : 'buyProduct', component: BuyproductComponent},
      { path : 'getorders', component: GetordersComponent },
      { path : 'admin', component: AdminComponent },
      { path : 'updateManufacturer',  component: UpdatemanufacturerComponent},
      { path : 'unauth', component: UnauthorizedaccessComponent},
      {path : 'cartitems', component: AddtocartComponent}
    ]),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
