import { Component, OnInit } from '@angular/core';
import { CategorySummaryResponseModel } from 'src/app/shared/models/category.model';
import { ProductDto } from 'src/app/shared/models/product.model';
import { VendorDto } from 'src/app/shared/models/store.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
import { UserService } from 'src/app/core/services/user.service';
import { AppSettings } from 'src/app/configs/app-settings.config';
import { CategoryDto } from '../../shared/models/category.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Slides: string[] = AppSettings.banners;
  topCategories: CategoryDto[];
  topProducts: ProductDto[];
  topSuppliers: VendorDto[];
  selectedCountryId = 0;
  hoverOnCategory;
  Partners = AppSettings.partners;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private storeService: StoreService,
    public userService: UserService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getTopCategories();

    this.getTopProducts();

    this.getTopSuppliers();
  }
  getTopCategories() {

    this.categoryService.getTopCategories(8).subscribe(res => {
      this.topCategories = this.load(res.categories);
    });
  }

  getTopProducts() {
    this.productService.getTopProducts({ size: 12, countryId: this.selectedCountryId })
    .subscribe(res => {
      this.topProducts = this.load(res.products);
    });
  }

  getTopSuppliers() {
    this.storeService.getTopStores(12).subscribe(res => {
      this.topSuppliers = this.load(res.vendors);
    });
  }

  load(categoryData) {
    return categoryData;
  }

}
