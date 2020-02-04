import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LanguageDto } from 'src/app/shared/models/language.model';
import { CountryDto } from 'src/app/shared/models/country.model';
import { BanksModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  loading: boolean;
  viewPassword: boolean = false;
  emailFormControl = new FormControl({ value: undefined, disabled: this.loading }, [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl({ value: undefined, disabled: this.loading }, [
    Validators.required,
  ]);
  cpasswordFormControl = new FormControl({ value: undefined, disabled: this.loading }, [
    Validators.required,
  ]);

  registered: boolean;
  bank: string;
  PreferredLanguageId: number;
  languages: LanguageDto[];
  countries: CountryDto[];
  banks: BanksModel[];
  referralCode: string;
  fetchingBanks: boolean;
  selectedCountry: CountryDto;
  selectedCountryId: number;

  refCodeFormControl = new FormControl({ value: this.referralCode, disabled: this.loading });
  firstNameFormControl = new FormControl({ value: undefined, disabled: this.loading });
  lastNameFormControl = new FormControl({ value: undefined, disabled: this.loading });
  phoneNumberFormControl = new FormControl({ value: undefined, disabled: this.loading }, [
    Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
  ]);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
     // if (params['bank']) {
     //   this.bank = params['bank'];
     // }
      if (params['referralCode']) {
        this.referralCode = params['referralCode'];
      }
    });
    this.getLanguages();
    this.getOperatingCountries();
  }


  register() {
    this.loading = true;
    const headers = { 'Authorization': 'Bearer my-token' };
    this.userService.registerUser({ email: encodeURI(this.emailFormControl.value),
       password: encodeURI(this.passwordFormControl.value), confirmPassword: encodeURI(this.cpasswordFormControl.value),
      // preferredLanguageId: this.PreferredLanguageId,
       // OriginatingBank: this.bank,
        // ReferrerCode: this.refCodeFormControl.value,
         firstname: this.firstNameFormControl.value,
         lastname: this.lastNameFormControl.value,
         // tslint:disable-next-line:max-line-length
         phonenumber: this.selectedCountry ? ("+" + this.selectedCountry.CallingCode + "" + this.phoneNumberFormControl.value) : this.phoneNumberFormControl.value,
          defaultCountryId: this.selectedCountryId,role_ids: [3] }).subscribe(
      () => {
        this.toastr.success("Check your mail to activate your account", "Registration Successful");
        this.loading = false;
        this.registered = true;
      },
      error => {
        this.loading = false;
       // console.log(error.error.message);
        this.toastr.error(error || "An error occured", "ERROR!");
      });
  }

  getLanguages() {
    const languages = localStorage.afrimartLanguages
    if (languages) {
      this.languages = JSON.parse(languages).Data;
      this.setLanguageIdForLocaleLanguage();
    } else {
      this.utilityService.getLanguages().subscribe(data => {
        if (data) {
          this.languages = data.languages;
          this.setLanguageIdForLocaleLanguage();
        }
      });
    }
  }

  setLanguageIdForLocaleLanguage() {
    const locale = this.utilityService.switchLanguage(navigator.language.substring(0, 2));
    this.languages.forEach(lang => {
      if (lang.name + '' === locale + '') {
        this.PreferredLanguageId = lang.id;
      }
    });
  }

  getOperatingCountries() {
    const africanCountries = localStorage.africanCountries;
    if (africanCountries) {
      this.countries = this.utilityService.sortArrayOfObjectsByKey(JSON.parse(africanCountries).Data, 'FullName');
    } else {
      this.utilityService.getOperatingCountries(0, 60).subscribe(
        data => {
          this.countries = this.utilityService.sortArrayOfObjectsByKey(data.countries, 'FullName');
        }
      );
    }
  }

  getBanksByCountryId() {
    this.selectedCountry = this.countries.find(countr => countr.id === this.selectedCountryId);
    this.banks = undefined;
    this.fetchingBanks = true;
    // console.log(this.selectedCountryId, this.selectedCountry)
    if (this.selectedCountry) {
      this.utilityService.getBanksPerCountry(this.selectedCountry.id).subscribe(
        data => {
          this.fetchingBanks = false;
          this.banks = data.Data;
        }, () => {
          this.fetchingBanks = false;
        }
      );
    }
  }

  checkIfDataIsValid(): boolean {
    if (this.emailFormControl.hasError('required') || this.emailFormControl.hasError('email')) {
      return false;
    } else if (this.passwordFormControl.hasError('required') || this.passwordFormControl.hasError('password')) {
      return false;
    } else if (this.cpasswordFormControl.hasError('required') || (this.cpasswordFormControl.value !== this.passwordFormControl.value)) {
      return false;
    } else if (this.phoneNumberFormControl.hasError('pattern')) {
      return false;
    } else {
      return true;
    }
    // const res = (
    //   (this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required'))
    //   ||
    //   this.emailFormControl.hasError('required')
    //   ||
    //   (this.passwordFormControl.hasError('password') && !this.passwordFormControl.hasError('required'))
    //   ||
    //   this.passwordFormControl.hasError('required')
    //   ||
    //   ((this.cpasswordFormControl.value != this.passwordFormControl.value) && (!this.cpasswordFormControl.hasError('required')))
    //   ||
    //   this.cpasswordFormControl.hasError('required')
    //   ||
    //   this.phoneNumberFormControl.hasError('pattern')
    // );
    // return res;
  }

}
