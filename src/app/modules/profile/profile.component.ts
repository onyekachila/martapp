import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CountryDto } from 'src/app/shared/models/country.model';
import { UpdateUserModel, ApplicationUserViewModel } from 'src/app/shared/models/user.model';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageDto } from 'src/app/shared/models/language.model';
import { AcceptedCurrencyViewModel } from 'src/app/shared/models/currency.model';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: ApplicationUserViewModel;
  editting: boolean;
  loading: boolean;
  profileUpdateErrorMessage: string;
  currencies: AcceptedCurrencyViewModel[];
  countries: CountryDto[];
  languages: LanguageDto[];
  // startdate = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  selectedDateOfBirth = new Date();
  supplierDashboardUrl: string = this.utilityService.getBaseUrl().replace("#", "") + "/suppliers/#/";
  adminDashboardUrl: string = this.utilityService.getBaseUrl().replace("#", "") + "/admin/#/";
  isUserHasPassword: boolean;
  // tslint:disable-next-line:max-line-length
  isAdminLoggedIn: boolean = this.userService.checkIfAdmin() || this.userService.checkIfAfrimartMarketerAdmin() || this.userService.checkIfSuperAdmin() || this.userService.checkIfExecutive();
  selectedCountry: CountryDto;
  signingOut: boolean;
  croppingImage: boolean;
  uploadingImage: boolean;
  imageChangedEvent: any;
  croppedImage: any;
  errorMessage: string;

 // @ViewChild(BsDatepickerDirective, null) datepicker: BsDatepickerDirective;

  @HostListener('window:scroll')
  onScrollEvent() {
   // if (this.datepicker) {
   //   this.datepicker.hide();
   // }
  }
  constructor(
    public userService: UserService,
    private toastr: ToastrService,
    private utilityService: UtilityService
  ) {
    // this.startdate.setDate(this.startdate.getDate() - (100 * 365));
    // this.selectedDateOfBirth.setDate(this.selectedDateOfBirth.getDate() - (100 * 365));
    this.maxDate.setDate(this.maxDate.getDate() - (13 * 365));
    this.minDate.setDate(this.minDate.getDate() - (100 * 365));
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getUserDetail();
    this.isUserHasPassword = this.userService.getLocalCurrentUserDet().HasPassword;
    this.getCurrencies();
    this.getOperatingCountries();
    this.getLanguages(60);
  }


  getUserDetail() {
    this.user = this.userService.getLocalCurrentUserDet();
    this.setDefaultPreferredLang();
    this.userService.getLoggedInUserDetails().subscribe(
      data => {
        // console.log(data);
        //this.user = data;
        this.setDefaultPreferredLang();
      }
    );
  }

  setDefaultPreferredLang() {
    if (!this.user.PreferredLanguage) {
      this.user.PreferredLanguage = {
        id: 1,
        name: 'English'
      };
    }
    this.selectedDateOfBirth = new Date(this.user.DateOfBirth);
  }

  onDatePickerValueChange(e) {
    this.selectedDateOfBirth = e;
  }


  toggleEdit() {
    this.editting = !this.editting;
    // if (this.editting) {
    //   if (this.user.PhoneNumber) {
    //     this.user.PhoneNumber = this.user.PhoneNumber.replace(`+${this.selectedCountry.CallingCode}`, "");
    //   }
    // } else {
    //   this.user.PhoneNumber = `+${this.selectedCountry.CallingCode}${this.user.PhoneNumber}`
    // }

  }

  update() {
    if (this.verifyUserInput()) {
      // console.log(this.selectedDateOfBirth)
      const updateModel: UpdateUserModel = {
        FirstName: this.user.FirstName,
        LastName: this.user.LastName,
        PhoneNumber: `${this.user.PhoneNumber}`,
        DateOfBirth: this.selectedDateOfBirth,
        DefaultCountryId: this.user.DefaultCountryId,
        PreferredCurrencyId: this.user.PreferredCurrencyId,
        PreferredLanguageId: this.user.PreferredLanguage.id
      };
      // console.log(updateModel);
      this.loading = true;
      this.userService.update(updateModel).subscribe(
        () => {
          this.loading = false;
          this.toastr.success('Update Successful!', "", {
            tapToDismiss: true,
            timeOut: 10000,
            progressBar: true
          });
          this.user.DateOfBirth = `${this.selectedDateOfBirth}`;
          // setTimeout(() => {
          //   window.location.reload();
          // }, 10000);
          this.toggleEdit();
        },
        error => {
          this.loading = false;
          this.toastr.error(error || 'Something went wrong', "", {
            tapToDismiss: true,
            timeOut: 10000,
            progressBar: true
          });
        }
      );
    }

  }

  verifyUserInput() {
    if (!this.user.FirstName || this.user.FirstName.trim() == '') {
      this.profileUpdateErrorMessage = 'First Name can not be empty.';
      return false;
    }
    if (!this.user.LastName || this.user.LastName.trim() == '') {
      this.profileUpdateErrorMessage = 'Last Name can not be empty.';
      return false;
    }
    if (!this.user.DefaultCountryId || this.user.DefaultCountryId == 0) {
      this.profileUpdateErrorMessage = 'You must select a country.';
      return false;
    }
    if (!this.user.PhoneNumber || this.user.PhoneNumber.trim() == '') {
      this.profileUpdateErrorMessage = 'Phone Number can not be empty.';
      return false;
    }
    if (!this.user.PreferredCurrencyId || this.user.PreferredCurrencyId == 0) {
      this.profileUpdateErrorMessage = 'You must select a preferred currency.';
      return false;
    } else {
      this.profileUpdateErrorMessage = undefined;
      return true;
    }
  }

  getCurrencies() {
   /* try {
      this.currencies = this.utilityService.sortArrayOfObjectsByKey(JSON.parse(localStorage.currencies).Data, 'Name');
    } catch (error) {
      this.utilityService.getCurrencies(0, 50).subscribe(
        data => {
          this.currencies = this.utilityService.sortArrayOfObjectsByKey(data.Data, 'Name');
        }
      );
    }*/
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

  getOperatingCountries() {
    const africanCountries = localStorage.africanCountries;
    if (africanCountries) {
      this.countries = this.utilityService.sortArrayOfObjectsByKey(JSON.parse(africanCountries).Data, 'name');
      this.valueChange();
    } else {
      this.utilityService.getOperatingCountries(0, 60).subscribe(
        data => {
          this.countries = this.utilityService.sortArrayOfObjectsByKey(data.countries, 'name');
          this.valueChange();
        }
      );
    }
  }

  valueChange(e?) {
    // console.log(e);
    this.getCountryByFind(this.user.DefaultCountryId);
  }

  getCountryByFind(id: number) {
    // console.log(this.user.DefaultCountryId);
    this.selectedCountry = this.countries.find((x: CountryDto) => x.id === id);
    // console.log(this.selectedCountry);
    if (this.selectedCountry) {
      this.user.PreferredCurrencyId = this.selectedCountry.DefaultCurrency.Id;
    }
  }

  logout() {
    this.signingOut = true;
    this.userService.logout().then();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.croppingImage = true;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }


  uploadProfilePicture() {
    // console.log(this.data.image);
    this.uploadingImage = true;
    this.errorMessage = undefined;
    this.userService.updateUserProfilePicture({ File: this.utilityService.replaceImageDataString(this.croppedImage) }).subscribe(
      data => {
        this.user.ImageUrl = this.croppedImage;
        this.croppingImage = false;
        this.uploadingImage = false;
        this.imageChangedEvent = '';
        this.croppedImage = '';
      }, error => {
        this.croppingImage = false;
        this.uploadingImage = false;
        this.errorMessage = error || error.Message || 'Upload Failed!';
      }
    );
  }

}
