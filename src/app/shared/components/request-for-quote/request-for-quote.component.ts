import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AcceptedCurrencyViewModel } from '../../models/currency.model';
import { ProductUnitViewModel, ProductDto } from '../../models/product.model';
import { CountryDto } from '../../models/country.model';
import { LeadsNewRequestModel } from '../../models/leads.model';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ProductService } from 'src/app/core/services/product.service';

import { UserService } from 'src/app/core/services/user.service';
import { LeadsService } from 'src/app/core/services/leads.service';

@Component({
  selector: 'app-request-for-quote',
  templateUrl: './request-for-quote.component.html',
  styleUrls: ['./request-for-quote.component.css']
})
export class RequestForQuoteComponent implements OnInit {

  product: ProductDto;
  list: any[] = [];
  emailFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl(null, [
    Validators.required
  ]);
  productnameFormControl = new FormControl(null, [
    Validators.required
  ]);
  productdescriptionFormControl = new FormControl(null, [
    Validators.required
  ]);
  qtyFormControl = new FormControl(null, [
    Validators.required
  ]);
  unitsFormControl = new FormControl(1, [
    Validators.required
  ]);
  currencyFormControl = new FormControl(1, [
    Validators.required,
  ]);
  minPricePerUnitFormControl = new FormControl(1000, [
    Validators.required
  ]);
  maxPricePerUnitFormControl = new FormControl(1000, [
    Validators.required
  ]);

  currencies: AcceptedCurrencyViewModel[];
  productUnits: ProductUnitViewModel[];
  countries: CountryDto[] = [];
  selectedCountries: CountryDto[] = [];
  loadedCountries: CountryDto[] = [];
  RFQ_Model: LeadsNewRequestModel;
  loading: boolean;
  errorMessage: string;
  successMessage: string;
  regions = [
    'Northern Africa',
    'Southern Africa',
    'Western Africa',
    'Eastern Africa',
    'Central Africa'
  ];
  isUserLoggedIn: boolean;
  selectedCurrency: AcceptedCurrencyViewModel;

  constructor(
    private utilityService: UtilityService,
    private productService: ProductService,
   // private authService: AuthenticationService,
    private userService: UserService,
    private leadsService: LeadsService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.getCurrencies();
    this.getProductUnits();
    this.getOperatingCountries();
   // const currUser = this.authService.getLocalCurrentUser();
   // if (currUser) {
   //   this.isUserLoggedIn = true;
   // }
    if (this.product) {
      this.productnameFormControl.setValue(this.product.name);
      this.productdescriptionFormControl.setValue(this.product.description);
    /*  this.currencyFormControl.setValue(this.product.DefaultCurrencyId);
      this.unitsFormControl.setValue(this.product.PurchaseProductUnitId);
      this.maxPricePerUnitFormControl.setValue(this.product.MaximumPricePerUnit);
      this.minPricePerUnitFormControl.setValue(this.product.MinimumPricePerUnit);
      this.qtyFormControl.setValue(this.product.MinimumNumberOfUnits);*/
    }
    this.currencyFormControl.valueChanges.subscribe(val => { this.selectedCurrency = this.currencies.find(curr => curr.Id == val); })
    // console.log(product);
  }

  getProductUnits() {
    if (localStorage.afrimartProductUnits) {
      this.productUnits = JSON.parse(localStorage.afrimartProductUnits).Data
    } else {
      this.productService.getProductUnits().subscribe(
       // data => { this.productUnits = data.Data; }
      );
    }
  }

  getCurrencies() {
    try {
      this.currencies = JSON.parse(localStorage.currencies).Data;
      this.selectedCurrency = this.currencies.find(x => x.Id == this.currencyFormControl.value);
    } catch (error) {
      this.utilityService.getCurrencies().subscribe(
        data => {
          this.currencies = data.Data;
          this.selectedCurrency = this.currencies.find(x => x.Id == this.currencyFormControl.value);
        }
      )
    }
  }

  getOperatingCountries() {
    const africanCountries = localStorage.africanCountries;
    if (africanCountries) {
      this.countries = JSON.parse(africanCountries).Data;
    } else {
      this.utilityService.getOperatingCountries().subscribe(
        data => {
          this.countries = data.countries;
        }
      );
    }
  }


  postRFQ() {
    if (this.validateEntry()) {
      this.loading = true;
      // console.log(this.RFQ_Model)
      this.leadsService.PostRequirement(this.RFQ_Model).subscribe(
        () => {
          // this.utilityService.setUserQuotes(this.RFQ_Model);
          this.loading = false;
          this.selectedCountries = [];
          this.toastr.success("", `Request for Quote - ${this.RFQ_Model.ProductName} Sent`);
          this.bsModalRef.hide();
          this.RFQ_Model = undefined;
        }, error => {
          this.loading = false;
          // this.bsModalRef.hide();
          this.errorMessage = error || 'An error occured. Please try again';
        }
      );
    }
  }

  validateEntry() {
    let name;
    let email;
    let countryIds: number[] = [];
    const currUserDet = this.userService.getLocalCurrentUserDet();
    if (currUserDet) {
      name = this.userService.getUserName();
      email = currUserDet.Email;
    } else {
      email = this.emailFormControl.value;
      name = this.nameFormControl.value;
    }
    this.selectedCountries.forEach(country => {
      countryIds.push(country.id);
    });
    this.RFQ_Model = {
      ProductName: this.productnameFormControl.value,
      PriceRange: `${this.minPricePerUnitFormControl.value} - ${this.maxPricePerUnitFormControl.value}`,
      MaxPrice: this.maxPricePerUnitFormControl.value,
      MinPrice: this.minPricePerUnitFormControl.value,
      Quantity: this.qtyFormControl.value,
      ProductUnitId: this.unitsFormControl.value,
      Details: this.productdescriptionFormControl.value,
      AcceptedCurrencyId: this.currencyFormControl.value,
      TargetCountryIds: countryIds,
      UserEmail: email,
      UserName: name
    }
    // console.log(this.RFQ_Model);
    if (!this.RFQ_Model.UserName || (this.RFQ_Model.UserName && this.RFQ_Model.UserName.trim() == '')) {
      this.errorMessage = 'System can not detect your Name. Pls enter your name';
      return false;
    } else if (!this.RFQ_Model.UserEmail || (this.RFQ_Model.UserEmail && this.RFQ_Model.UserEmail.trim() == '')) {
      this.errorMessage = 'System can not detect your Email. Pls enter your email';
      return false;
    } else if (!this.RFQ_Model.ProductName || (this.RFQ_Model.ProductName && this.RFQ_Model.ProductName.trim() == '')) {
      this.errorMessage = 'Product Name can not be empty';
      return false;
    } else if (!this.RFQ_Model.Details || (this.RFQ_Model.Details && this.RFQ_Model.Details.trim() == '')) {
      this.errorMessage = 'Product Description/Specification can not be empty.';
      return false;
    } else if (this.RFQ_Model.Quantity === 0 || !this.RFQ_Model.Quantity) {
      this.errorMessage = 'Quantity can not be 0.';
      return false;
    } else if (!this.RFQ_Model.TargetCountryIds || this.RFQ_Model.TargetCountryIds.length < 1) {
      this.errorMessage = 'Targeted Countries list can not be empty';
      return false;
    } else if (!this.RFQ_Model.AcceptedCurrencyId) {
      this.errorMessage = 'Please specify the currency you operate with';
      return false;
    } else if (!this.RFQ_Model.MinPrice) {
      this.errorMessage = 'Please specify the min price you willing to pay for each unit';
      return false;
    } else if (!this.RFQ_Model.MaxPrice) {
      this.errorMessage = 'Please specify the max price you willing to pay for each unit';
      return false;
    } else if (!this.RFQ_Model.PriceRange) {
      this.errorMessage = 'Please specify the price you willing to pay for each unit';
      return false;
    } else {
      this.errorMessage = null;
      return true;
    }
  }

  country_onChange(country, isChecked) {
    const index = this.selectedCountries.indexOf(country);
    if (isChecked.checked) {
      if (index > -1) {
      } else {
        this.selectedCountries.push(country);
      }
    } else {
      this.selectedCountries.splice(index, 1);
    }
  }

  region_onChange(region) {
    // console.log(this.countries)
    const region_countries = this.countries.filter(x => x.Region === region);
    this.loadedCountries = region_countries;
  }

  continent_onChange(isChecked) {
    // console.log(this.countries)
    const region_countries = this.countries;
    this.loadedCountries = this.countries;
    if (isChecked.checked) {
      region_countries.forEach(country => {
        const index = this.selectedCountries.indexOf(country);
        if (index > -1) { } else {
          this.selectedCountries.push(country);
        }
      });
    } else {
      region_countries.forEach(country => {
        const index = this.selectedCountries.indexOf(country);
        this.selectedCountries.splice(index, 1);
      });
    }
  }

}
