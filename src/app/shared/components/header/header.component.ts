import { Component, OnInit } from '@angular/core';
import { LanguageDto } from '../../models/language.model';
import { CountryDto } from '../../models/country.model';
import { IpDataModel } from '../../models/data.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import { debounceTime, tap, switchMap, finalize, mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ThemeChangerService } from '../../themes/theme-changer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/core/services/user.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { WishlistComponent } from 'src/app/modules/product/wishlist/wishlist.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserService,
    private utilityService: UtilityService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private global: ThemeChangerService,
    private generalService: GeneralService,
    private modalService: BsModalService
  ) {
    this.changeLang('en');
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);
        if (this.currentUrl.includes('/product-search/')) {
          // tslint:disable-next-line:max-line-length
          this.usersForm.setValue({ userInput: decodeURI(this.utilityService.getStringAfterCharacter(this.currentUrl, '/product-search/')) })
        } else if (this.currentUrl.includes('/store-search/')) {
          this.usersForm.setValue({ userInput: decodeURI(this.utilityService.getStringAfterCharacter(this.currentUrl, '/store-search/')) })
        } else {
          this.usersForm.setValue({ userInput: null });
        }
      }
    });

    const dis = this;
    // When the user scrolls the page, execute myFunction
    // tslint:disable-next-line:only-arrow-functions
    window.onscroll = function () { dis.makeStickyFunction() };
  }

  productSearchResults$: string[];
  categorySearchResults$: string[];
  storeSearchResults$: string[];
  languages: LanguageDto[];
  countries: CountryDto[] = [{
    name: 'All Africa',
    id: 0
  }];
  ipData: IpDataModel;
  selectedCountry: CountryDto = {
    name: 'All Africa',
    id: 0
  };
  language: string;
  signingOut: boolean;
  supplierDashboard: string = this.utilityService.getBaseUrl().replace("#", "") + "/suppliers/#/";
  administrativeDashboard: string = this.utilityService.getBaseUrl().replace("#", "") + "/admin/#/";
  productSearchObject = 'Products';
  supplierSearchObject = 'Suppliers';
  categorySearchObject = 'Categories';
  searchSelectedObject: string = this.productSearchObject;
  usersForm: FormGroup;
  isLoading = false;
  currentUrl: string;
  bsModalRef: BsModalRef;


  // tslint:disable-next-line:member-ordering
  dataSource: Observable<string[]>;




  themes: Array<{ title: string, theme: string }> = [
    { title: 'Default Theme', theme: '' },
    { title: 'Demo Theme', theme: 'theme-yellow' },
    { title: 'Agric Theme', theme: 'theme-agric' },
    { title: 'Orange Theme', theme: 'theme-demo' }
  ];

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    });

    this.performSearch();
    this.getAutocomplete();


    this.getLanguages(100);
    // this.getHeaderStores();
    // this.getStores();
    this.getOperatingCountries(60);
    // this.utilityService.getIp().then(
    //   data => {
    //     // console.log(data)
    //     this.ipData = data;
    //     this.ipData.location.country_flag = `assets/images/african-countries/${this.ipData.country_name.toLowerCase()}.png`;
    //     this.loopThroughCountries();
    //   }
    // ).catch(error => {
    //   // console.log(error)
    // });
  }
  changeTypeaheadLoading(e: boolean): void {
    this.isLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('Selected value: ', e.value);
    this.gotoSearchPage(e.value);
  }

  getAutocomplete() {
    // tslint:disable-next-line: deprecation
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.usersForm.get('userInput').value);
    })
      .pipe(
        mergeMap((token: string) => this.utilityService.autoCompleteSearch(token, this.searchSelectedObject))
      );
  }


  performSearch() {
    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.utilityService.autoCompleteSearch(value, this.searchSelectedObject)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(res => {
        if (this.searchSelectedObject === 'Products') {
          this.productSearchResults$ = res;
        }
        if (this.searchSelectedObject === 'Stores') {
          this.storeSearchResults$ = res;
        }
        if (this.searchSelectedObject === 'Categories') {
          this.categorySearchResults$ = res;
        }
      });
  }

  // triggerSideNav() {
  //   this.sideNavState = !this.sideNavState;
  //   if (this.sideNavState) {
  //     this.genralService.openSideNav.emit();
  //   } else {
  //     this.genralService.closeSideNav.emit();
  //   }
  // }


  checkIfUserIsAdmin() {
    // tslint:disable-next-line:max-line-length
    return (this.userService.checkIfAdmin() || this.userService.checkIfSuperAdmin() || this.userService.checkIfAfrimartMarketerAdmin() || this.userService.checkIfExecutive());
  }

  checkIfUserIsMerchant() {
    if ((this.userService.checkIfAdmin() || this.userService.checkIfSuperAdmin() || this.userService.checkIfAfrimartMarketerAdmin())) {
      return false;
    } else {
      return this.userService.checkIfMerchant();
    }
  }


  getLanguages(size: number) {
    const languages = localStorage.afrimartLanguages
    if (languages) {
      this.languages = JSON.parse(languages).Data;
    } else {
      this.utilityService.getLanguages(size).subscribe(
        data => {
          this.languages = data.languages;
        }
      );
    }
  }

  getOperatingCountries(total) {
    const africanCountries = localStorage.africanCountries;
    if (africanCountries) {
      // this.countries = JSON.parse(africanCountries).Data;
      JSON.parse(africanCountries).Data.forEach(country => {
        this.countries.push(country);
      });
      this.loopThroughCountries();
    } else {
      this.utilityService.getOperatingCountries(0, total).subscribe(
        data => {
          data.countries.forEach(country => {
            this.countries.push(country);
          });
          this.loopThroughCountries();
        }
      );
    }
  }

  loopThroughCountries() {
    try {
      if (this.ipData) {
        // console.log(this.ipData)
        this.countries.forEach(country => {
          if (country.name.trim() === this.ipData.country_name.trim()) {
            this.selectCountry(country);
          }
        });
      } else {
        this.selectCountry(this.countries[0]);
      }
    } catch (error) {
      // console.error(error);
    }
  }

  switchLanguage(language: string) {
    this.changeLang(language);
  }


  changeLang(language: string) {
    this.language = language;
    const ret = this.utilityService.switchLanguage(language);
    // console.log(ret);
    if (ret !== '') {
      this.language = ret;
    }
    // console.log(this.language);
  }

  logout() {
    this.signingOut = true;
    this.userService.logout().then(() => { this.signingOut = false }, err => { this.signingOut = false; this.toastr.error(err) });
  }

  gotoSearchPage(searchString?: string) {
    let term;
    if (searchString) {
      term = searchString;
    } else {
      term = this.usersForm.get('userInput').value;
    }
    if (term) {
      switch (this.searchSelectedObject) {
        case this.productSearchObject:
          this.router.navigateByUrl('/product-search/' + term);
          break;
        case this.supplierSearchObject:
          this.router.navigateByUrl('/store-search/' + term);
          break;
        default:
          this.router.navigateByUrl('/search/' + term);
          break;
      }
    }

  }

  // openRequestForQuoteDialog() {
  //   this.dialog.open(RequestForQuoteComponent, {
  //     width: '800px',
  //     data: { Name: "" }
  //   });
  // }

  selectCountry(country: CountryDto) {
    this.selectedCountry = country;
    localStorage.afrimartSelectedCountry = JSON.stringify(this.selectedCountry);
  }


  openWishlistDialog() {
    this.bsModalRef = this.modalService.show(WishlistComponent);
  }

  // changeTheme(theme: string) {
  //   this.global.themeChangeEmitter.emit(theme);
  // }

  makeStickyFunction() {
    this.generalService.windowpageYOffset.emit(window.pageYOffset);
    let header = document.getElementById("Header");
    // console.log(header)
    if (header) {
      // Get the offset position of the navbar
      let sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }

}
