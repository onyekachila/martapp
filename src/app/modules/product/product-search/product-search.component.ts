import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ProductDto, SearchFilterRequestModel } from 'src/app/shared/models/product.model';
import { CategorySummaryResponseModel } from 'src/app/shared/models/category.model';
import { CountryDto } from 'src/app/shared/models/country.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private utilityService: UtilityService
  ) { }

  searchString: string;
  Products: ProductDto[];
  pageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 20
  };
  selectedCountryId: number;
  relatedCategories: CategorySummaryResponseModel[] = [];
  Countries: CountryDto[] = [{
    name: 'All Africa',
    id: 0
  }];
  maxNumOfCatsToShow = 5;
  topProducts: ProductDto[];
  regions: string[] = [];
  regionCountries: CountryDto[] = [];
  filter: SearchFilterRequestModel = {
    CountryIds: [0],
    MaxPrice: null,
    MinPrice: null
  };

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe(() => {
      this.searchString = this.route.snapshot.paramMap.get('searchString');
      try {
        this.selectedCountryId = JSON.parse(localStorage.afrimartSelectedCountry).Id;
      } catch (error) {
      }
      this.getProducts();
    });
    this.getOperatingCountries();
    this.getTopProducts();
  }

  getProducts(index: number = this.pageEvent.pageIndex, size: number = this.pageEvent.pageSize) {
    if (this.filter.CountryIds.length === 0) {
      this.filter.CountryIds = [0];
    }
    this.Products = undefined;
    /*this.productService.getFilteredProducts(this.searchString, size, index, this.filter).subscribe(
      data => {
        this.Products = data.Data;
        this.pageEvent.length = data.Count;
        this.pageEvent.pageIndex = data.Page;
        this.pageEvent.pageSize = data.Size;

        this.getRelatedCategories();
      }, error => {
        this.Products = [];
      }
    );*/
  }


  loadMoreProducts(setPageSizeOptionsInput: { page: number }) {
    this.pageEvent.pageIndex = setPageSizeOptionsInput.page;
    this.getProducts();
  }

  onLinkClick() {
    this.router.navigate([`store-search/${this.searchString}`]);
  }

  getRelatedCategories() {
    if (!this.relatedCategories) {
      this.relatedCategories = [];
    }
    this.Products.forEach(prod => {
     /* prod.Categories.forEach(category => {
        // tslint:disable-next-line:only-arrow-functions
        if (this.relatedCategories.filter(function(e) { return e.Id === category.Id; }).length > 0) {
           this.relatedCategories contains the element we're looking for
        } else {
          this.relatedCategories.push(category);
        }
      });*/
    });
  }

  getOperatingCountries(total = 100) {
    const africanCountries = localStorage.africanCountries;
    if (africanCountries) {
      JSON.parse(africanCountries).Data.forEach(country => {
        this.Countries.push(country);
      });
      this.getRegions();
    } else {
      this.utilityService.getOperatingCountries(0, total).subscribe(
        data => {
          data.countries.forEach(country => {
            this.Countries.push(country);
          });
          this.getRegions();
        }
      );
    }
  }

  getRegions() {
    this.Countries.forEach(country => {
      // tslint:disable-next-line:only-arrow-functions
      if (this.regions.filter(function(e) { return e === country.Region; }).length > 0) {
      } else {
        if (country.Region && country.Region.trim() !== '') {
          this.regions.push(country.Region);
        }
      }
    });
  }

  selectCountry(country: CountryDto, event) {
    const index = this.filter.CountryIds.indexOf(country.id);
    // console.log(index, event)
    if (event.target.checked) {
      if (country.id === 0) {
        this.filter.CountryIds = [];
      } else {
        try {
          this.filter.CountryIds.splice(this.filter.CountryIds.indexOf(0, 1));
        } catch (error) {
        }
      }
      if (index > -1) {
      } else {
        this.filter.CountryIds.push(country.id);
      }
    } else {
      this.filter.CountryIds.splice(index, 1);
    }
    this.getProducts(0);
  }

  region_onChange(region, event) {
    // console.log(this.countries)
    this.regionCountries = this.Countries.filter(x => x.Region === region);
    if (event.target.checked) {
      try {
        this.filter.CountryIds.splice(this.filter.CountryIds.indexOf(0, 1));
      } catch (err) {
      }
      this.regionCountries.forEach(country => {
        // tslint:disable-next-line:only-arrow-functions
        if (this.filter.CountryIds.filter(function(e) { return e === country.id; }).length > 0) {
        } else {
          this.filter.CountryIds.push(country.id);
        }
      });
    } else {
      this.regionCountries.forEach(country => {
        try {
          this.filter.CountryIds.splice(this.filter.CountryIds.indexOf(country.id), 1);
        } catch (error) {
        }
      });
    }
    this.getProducts(0);
  }

  getTopProducts() {
    const topProducts = localStorage.afrimartTopProducts;
    if (topProducts) {
      this.topProducts = JSON.parse(topProducts).Data;
    }
    try {
      this.selectedCountryId = JSON.parse(localStorage.afrimartSelectedCountry).Id;
    } catch (error) {
    }
    this.productService.getTopProducts({ size: 12, countryId: this.selectedCountryId }).subscribe(data => {
      //this.topProducts = data.Data;
    });
  }

}
