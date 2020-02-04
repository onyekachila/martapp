import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { VendorDto } from 'src/app/shared/models/store.model';
import { CountryDto } from 'src/app/shared/models/country.model';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.css']
})
export class StoreSearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService, private utilityService: UtilityService
  ) { }

 // @ViewChild('staticTabs', null) staticTabs: TabsetComponent;
  searchString: string;
  Stores: VendorDto[];
  pageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 20
  };
  selectedCountryId: number;
  Countries: CountryDto[] = [{
    name: 'All Africa',
    id: 0
  }];
  selectedCountryIds: number[] = [0];
  maxNumOfCatsToShow: number = 5;
  topSuppliers: VendorDto[];
  regions: string[] = [];
  regionCountries: CountryDto[] = [];

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(() => {
      this.searchString = this.route.snapshot.paramMap.get('searchString');
      try {
        this.selectedCountryId = JSON.parse(localStorage.afrimartSelectedCountry).Id;
      } catch (error) {
      }
      this.getSuppliers();
      this.getOperatingCountries();
      this.getTopSuppliers();
    //  this.staticTabs.tabs[1].active = true;
    });
  }

  getSuppliers() {
    this.Stores = undefined;
    this.storeService.getStores(this.searchString, this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
      data => {
        this.Stores = data.vendors;
        this.pageEvent.length = data.Count;
        this.pageEvent.pageIndex = data.Page;
        this.pageEvent.pageSize = data.Size;
      }, error => {
        this.Stores = [];
      }
    );
  }

  loadMoreStores(setPageSizeOptionsInput: { page: number }) {
    this.pageEvent.pageIndex = setPageSizeOptionsInput.page;
    this.getSuppliers();
  }

  onLinkClick() {
    this.router.navigate([`product-search/${this.searchString}`]);
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
      if (this.regions.filter(function (e) { return e === country.Region }).length > 0) {
      } else {
        if (country.Region && country.Region.trim() !== '') {
          this.regions.push(country.Region);
        }
      }
    });
  }

  selectCountry(country: CountryDto, event) {
    const index = this.selectedCountryIds.indexOf(country.id);
    // console.log(index, event)
    if (event.target.checked) {
      if (country.id === 0) {
        this.selectedCountryIds = [];
      } else {
        try {
          this.selectedCountryIds.splice(this.selectedCountryIds.indexOf(0, 1));
        } catch (error) {
        }
      }
      if (index > -1) {
      } else {
        this.selectedCountryIds.push(country.id);
      }
    } else {
      this.selectedCountryIds.splice(index, 1);
    }
  }

  region_onChange(region, event) {
    // console.log(this.countries)
    this.regionCountries = this.Countries.filter(x => x.Region === region);
    if (event.target.checked) {
      try {
        this.selectedCountryIds.splice(this.selectedCountryIds.indexOf(0, 1));
      } catch (err) {
      }
      this.regionCountries.forEach(country => {
        if (this.selectedCountryIds.filter(function (e) { return e === country.id }).length > 0) {
        } else {
          this.selectedCountryIds.push(country.id);
        }
      });
    } else {
      this.regionCountries.forEach(country => {
        try {
          this.selectedCountryIds.splice(this.selectedCountryIds.indexOf(country.id), 1);
        } catch (error) {
        }
      });
    }
  }

  getTopSuppliers() {
    const topSuppliers = localStorage.afrimartTopStores;
    if (topSuppliers) {
      this.topSuppliers = JSON.parse(topSuppliers).Data;
    }
    try {
      this.selectedCountryId = JSON.parse(localStorage.afrimartSelectedCountry).Id;
    } catch (error) {
    }
    this.storeService.getTopStores(12, this.selectedCountryId).subscribe(data => {
      //this.topSuppliers = data.Data;
    });
  }


}
