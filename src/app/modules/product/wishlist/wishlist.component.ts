import { Component, OnInit } from '@angular/core';
import { ProductInWishListModel, ProductDto } from '../../../shared/models/product.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    //public authService: AuthenticationService,
    private wishlistService: WishlistService, public bsModalRef: BsModalRef
  ) { }

  WishListItems: ProductDto[];

  ngOnInit() {
    this.getUserWishList();
    this.wishlistService.WishListItems.subscribe(() => this.getUserWishList());
  }

  getUserWishList() {
   /* let currUser = this.authService.getLocalCurrentUser();
    if (currUser) {
      try {
        this.loadWishlistItems(this.wishlistService.getWishListLocal());
      } catch (error) {
      }
      this.wishlistService.getProductsInWishList().subscribe(
        data => {
        // this.loadWishlistItems(data.Data);
        }
      )
    } else {
      this.WishListItems = [];
    }*/
  }

  loadWishlistItems(data: ProductInWishListModel[]) {
    this.WishListItems = [];
    // tslint:disable-next-line:prefer-for-of
    for (let a = 0; a < data.length; a++) {
      const wpModel: ProductDto = data[a].Product;
      this.WishListItems.push(wpModel);
    }
  }
  closeModal() {
    this.bsModalRef.hide()
  }


}
