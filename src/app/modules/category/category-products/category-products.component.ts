import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from 'src/app/shared/models/product.model';
import { CategoryDto } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  categoryProducts: ProductDto[];
  pageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 20
  };
  category: CategoryDto;
  categoryProductsNum: number;
  hoverOnCategory: CategoryDto;

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe(() => {
      this.hoverOnCategory = undefined;
      this.getCategoryProducts();
      this.getCategoryDetail();
    });
  }

  getCategoryProducts() {
    this.categoryProducts = undefined;
    const categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.productService.getCategoryProducts(categoryId, this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
      categoryProductsRes => {
       /* this.categoryProducts = categoryProductsRes.Data;
        this.pageEvent.length = categoryProductsRes.Count;
        this.pageEvent.pageIndex = categoryProductsRes.Page;
        this.pageEvent.pageSize = categoryProductsRes.Size;*/
      }
    );
  }

  getCategoryDetail() {
    this.category = new CategoryDto();
    const categoryId = +this.route.snapshot.paramMap.get('categoryId');
   /* this.categoryService.getCategory(categoryId).subscribe(
      categoryRes => {
      //  this.category = categoryRes;
        if (this.category.ChildCategories.length == 0) { this.categoryProductsNum = 0 };
        this.category.ChildCategories.forEach(ca => {
          this.getSubCategoryProducts(ca.Id);
        });
      }
    );*/
  }


  loadMoreProducts(setPageSizeOptionsInput) {
    this.pageEvent = setPageSizeOptionsInput;
    this.getCategoryProducts();
  }

  getSubCategoryProducts(catId: number, page: number = 0) {
    this.productService.getCategoryProducts(catId, page, 8).subscribe(
      categoryProductsRes => {
        if (!this.categoryProductsNum) { this.categoryProductsNum = 0 }
       // this.categoryProductsNum = this.categoryProductsNum + categoryProductsRes.Data.length;
        var index = this.category.ChildCategories.findIndex(x => x.id === catId);
        if (~index) {
          if (page == 0) {
          //  this.category.ChildCategories[index].Products = categoryProductsRes.Data;
          } else {
           // categoryProductsRes.Data.forEach(element => {
           //   this.category.ChildCategories[index].Products.push(element);
           // });
          }
          this.category.ChildCategories[index].ProductPageNum = page;
        }

      }
    );
  }

}
