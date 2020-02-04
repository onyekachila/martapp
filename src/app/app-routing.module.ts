import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading, ExtraOptions } from '@angular/router';
import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';


import { HomeComponent } from './modules/home/home.component';
import { ProductViewComponent } from './modules/product/product-view/product-view.component';
import { AllCategoriesComponent } from './modules/category/all-categories/all-categories.component';
import { TopProductsComponent } from './modules/product/top-products/top-products.component';
import { StoreProductsComponent } from './modules/business/store-products/store-products.component';
import { CategoryProductsComponent } from './modules/category/category-products/category-products.component';
import { SearchComponent } from './modules/search/search.component';
import { ProductSearchComponent } from './modules/product/product-search/product-search.component';
import { StoreSearchComponent } from './modules/business/store-search/store-search.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ViewCartComponent } from './modules/cart/view-cart/view-cart.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { HowToBecomeASupplierComponent } from './modules/how-to-become-a-supplier/how-to-become-a-supplier.component';
import { ViewInvoiceComponent } from './modules/invoice/view-invoice/view-invoice.component';
import { InvoiceListComponent } from './modules/invoice/invoice-list/invoice-list.component';
import { MessageComponent } from './modules/message/message.component';
import { CanActivateViaAuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { NoAuthGuard } from './modules/auth/no-auth.guard';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './modules/auth/change-password/change-password.component';
import { ActivateAccountComponent } from './modules/auth/activate-account/activate-account.component';
import { RegistrationComponent } from './modules/auth/registration/registration.component';


const routes: Routes = [  { path: 'home', component: HomeComponent },
{ path: 'product', component: ProductViewComponent },
{ path: 'product/:id', component: ProductViewComponent },
{ path: 'root-categories', component: AllCategoriesComponent },
{ path: 'top-products', component: TopProductsComponent },
{ path: 'store-products', component: StoreProductsComponent },
{ path: 'store-products/:storeId', component: StoreProductsComponent },
{ path: 'category', component: CategoryProductsComponent },
{ path: 'category/:categoryId', component: CategoryProductsComponent },
{ path: 'search', component: SearchComponent },
{ path: 'search/:searchString', component: SearchComponent },
{ path: 'product-search', component: ProductSearchComponent },
{ path: 'product-search/:searchString', component: ProductSearchComponent },
{ path: 'store-search', component: StoreSearchComponent },
{ path: 'store-search/:searchString', component: StoreSearchComponent },
{ path: 'invoice', component: ViewInvoiceComponent, canActivate: [CanActivateViaAuthGuard] },
{ path: 'invoice/:invoiceId', component: ViewInvoiceComponent, canActivate: [CanActivateViaAuthGuard] },
{ path: 'invoices', component: InvoiceListComponent, canActivate: [CanActivateViaAuthGuard] },
{ path: 'messaging', component: MessageComponent, canActivate: [CanActivateViaAuthGuard] },
{ path: 'messaging/:contactId', component: MessageComponent, canActivate: [CanActivateViaAuthGuard] },
{ path: 'become-a-supplier', component: HowToBecomeASupplierComponent },
{ path: 'profile', component: ProfileComponent, canActivate: [CanActivateViaAuthGuard] },
{ path: 'cart', component: ViewCartComponent },
{ path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'categories', redirectTo: '/root-categories', pathMatch: 'full' },
{ path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
