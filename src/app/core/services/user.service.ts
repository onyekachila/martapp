import { Injectable } from '@angular/core';
//import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { retry, catchError, map } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { ToastrService } from 'ngx-toastr';
//import { AngularFireAuth } from '@angular/fire/auth';

import { ImageViewModel, UpdateUserModel, UserProfilePicturePostModel, UserProfilePictureUrlPostModel, CustomerDto, ApplicationUserViewModel, ThirdPartyModel, LoginResponseModel, ChangePasswordBindingModel, ActivateAccountDto, ResetPasswordWithCodeModel } from 'src/app/shared/models/user.model';
import { AppSettings } from 'src/app/configs/app-settings.config';
import { BaseApiService } from './base-api.service';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService: BaseApiService,
  //  private authService: AuthenticationService,
    private http: HttpClient,
    private generalService: GeneralService,
    private utilityService: UtilityService,
   // private afAuth: AngularFireAuth,
    private toastr: ToastrService,
  ) {
  }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;
  loginUrl = AppSettings.loginUrl;

  getUserName() {
    const currUserDet = this.getLocalCurrentUserDet();
    let name: string = '';
    if (currUserDet) {
      name += currUserDet.FirstName ? currUserDet.FirstName : '';
      if (name.trim() == '') {
        name = currUserDet.Email.slice(0, currUserDet.Email.indexOf('@'));
      }
    } else {
      name = null;
    }
    return name;
  }


  getLoggedInUserRoles() {
    var roles: string[];
    try {
      const currUser = this.getLocalCurrentUserDet();
      if (currUser) {
        roles = currUser.Roles;
      }
    } catch (error) {
    }
    return roles;
  }

  checkIfExecutive() {
    const roles = this.getLoggedInUserRoles();
    if (roles) {
      if (roles.indexOf('ExecutiveUser') !== -1) {
        return true;
      }
    } return false;
  }

  checkIfAdmin() {
    const roles = this.getLoggedInUserRoles();
    if (roles) {
      if (roles.indexOf('Admin') !== -1) {
        return true;
      }
    } return false;
  }

  checkIfSuperAdmin() {
    const roles = this.getLoggedInUserRoles();
    if (roles) {
      if (roles.indexOf('SuperAdmin') !== -1) {
        return true;
      }
    } return false;
  }

  checkIfAfrimartMarketerAdmin() {
    const roles = this.getLoggedInUserRoles();
    if (roles) {
      if (roles.indexOf('AfrimartMarketerAdmin') !== -1) {
        return true;
      }
    } return false;
  }

  checkIfMerchant() {
    const roles = this.getLoggedInUserRoles();
    if (roles) {
      if (roles.indexOf('Merchant') !== -1) {
        return true;
      }
    } return false;
  }

  checkIfUser() {
    const roles = this.getLoggedInUserRoles();
    if (roles) {
      if (roles.indexOf('User') !== -1) {
        return true;
      }
    } return false;
  }

  checkIfUserInfoUpdated() {
    if (this.getProfileStatusToBecomeAMerchantInPercentage() == 100) {
      return true;
    } else {
      return false;
    }
    // const currentUserDet = this.getLocalCurrentUserDet();
    // if (currentUserDet) {
    //   if (currentUserDet.FirstName && currentUserDet.LastName && currentUserDet.PhoneNumber && currentUserDet.DefaultCountryId) {
    //     if (currentUserDet.FirstName.trim() === '' ||
    //       currentUserDet.LastName.trim() === '' ||
    //       currentUserDet.PhoneNumber.trim() === '') { return false; } else {
    //       return true;
    //     }
    //   }
    //   else {
    //     return false;
    //   }
    // } else {
    //   return false;
    // }
  }

  GetUserImage(accountUserId: string) {
    return this.http.get<ImageViewModel>(`${this.apiUrl}Account/Image/${accountUserId}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  update(user: UpdateUserModel) {
    return this.http.put(`${this.apiUrl}Account`, JSON.stringify(user)).pipe(
      retry(3),
      map(() => {
        user.DateOfBirth.setDate(user.DateOfBirth.getDate() + 1)
        localStorage.afrimart_currentUserDetails = JSON.stringify(user); this.getLoggedInUserDetails().subscribe();
      }),
      catchError(this.handleError)
    );
  }

  updateUserProfilePicture(ImageBytes: UserProfilePicturePostModel) {
    return this.http.post(`${this.apiUrl}Account/Image`, JSON.stringify(ImageBytes)).pipe(
      map(res => { let user = this.getLocalCurrentUserDet();
        user.ImageUrl = `data:image/jpeg;base64,${ImageBytes.File}`; this.setLocalCurrentUserDet(user); }),
      retry(3),
      catchError(this.handleError)
    );
  }

  updateUserProfilePictureThirdParty(url: UserProfilePictureUrlPostModel) {
    return this.http.post(`${this.apiUrl}Account/Image/Url`, JSON.stringify(url))
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getUserProfilePictureLocal() {
    return this.getLocalCurrentUserDet() ? this.getLocalCurrentUserDet().ImageUrl : '';
  }

  /*RegisterUser(user: CustomerDto) {
    return this.http.post(`${this.apiUrl}account/register`, user);
  }*/

  getLoggedInUserDetails() {
    return this.http.get<ApplicationUserViewModel>(`${this.apiUrl}Account/UserInfo`)
      .pipe(
        retry(3),
        map((response) => {
         // this.setLocalCurrentUserDet(response);
          let lang = '';
          /*if (response.PreferredLanguage) {
            lang = response.PreferredLanguage.Name;
            // console.log('user det lang: ' + lang);
            if (lang)
              this.utilityService.switchLanguage(lang);
          }
          return response;*/
        }),
        catchError(this.handleError)
      );
  }


  getLoggedinUserRoles() {
    return this.http.get<string[]>(`${this.apiUrl}Account/Roles`)
      .pipe(
        retry(3),
        map((response) => {
          this.setUserRoles(JSON.stringify(response));
          return response;
        }),
        catchError(this.handleError)
      )
      ;
  }

  RegisterExternal(data: ThirdPartyModel) {
    return this.http.post(`${this.apiUrl}Account/SignInExternal`,
      (data)).pipe(
        retry(3),
        map((response) => {
          localStorage.afrimart_currentUser = JSON.stringify(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  public getLocalCurrentUserDet(): ApplicationUserViewModel {
    let user: ApplicationUserViewModel;
    try {
      if (localStorage.afrimart_currentUserDetails) {
        user = JSON.parse(localStorage.afrimart_currentUserDetails);
      }
    } catch (error) {
    }
    return user;
  }

  public setLocalCurrentUserDet(user: ApplicationUserViewModel) {
    localStorage.afrimart_currentUserDetails = JSON.stringify(user);
  }

  setUserRoles(roles: string) {
   /* var currentUser: any = this.authService.getLocalCurrentUser();
    currentUser.roles = roles;
    localStorage.afrimart_currentUser = JSON.stringify(currentUser);
    currentUser = this.getLocalCurrentUserDet();
    currentUser.Roles = roles;
    localStorage.afrimart_currentUserDetails = JSON.stringify(currentUser);*/
  }

  successfulLoginFuncs(UserData: ApplicationUserViewModel) {
    this.setLocalCurrentUserDet(UserData);
    //this.authService.getPermission();
    const dis = this;
   // const det = this.authService.getLocalCurrentUser();
    var cartId = localStorage.anonUserCartId;
    if (cartId) {
      if (confirm('Add items in Cart to your profile?')) {
        this.addAnonymousUsersCartToSignedInCart(cartId).subscribe(() => {
          console.log('added anonymous user\'s cart to user\'s cart');
        }, error => {
          console.log(error);
        });
      }
    }
   /* this.toastr.success(`Welcome ${det.userName}`, "", {
      positionClass: "toast-bottom-center",
      tapToDismiss: true,
      timeOut: 10000,
      progressBar: true
    });*/
    dis.openDashboard();
  }

  openDashboard() {
    var urlToOpen;
    if (this.checkIfSuperAdmin() || this.checkIfAdmin() || this.checkIfAfrimartMarketerAdmin() || this.checkIfExecutive()) {
      urlToOpen = this.utilityService.getBaseUrl().replace("#", "") + "/admin/#/";
    } if (this.checkIfMerchant()) {
      urlToOpen = this.utilityService.getBaseUrl().replace("#", "") + "/suppliers/#/";
    }
    if (urlToOpen) { window.open(urlToOpen); }
    if (this.checkIfUserInfoUpdated()) {
      window.location.href = this.utilityService.getBaseUrl() + "/home";
      // window.location.reload()
    } else {
      this.toastr.info('Profile not updated!', "Please update all necessary fields", {
        positionClass: "toast-bottom-center",
        tapToDismiss: true,
        timeOut: 10000,
        progressBar: true
      });
      window.location.href = this.utilityService.getBaseUrl() + "/profile";
    }
  }


  login(userDetail) {
    return this.http.post<LoginResponseModel>(this.loginUrl, userDetail).pipe(
      map((response) => {
        localStorage.afrimart_currentUser = JSON.stringify(response);
        this.setAccessTokenExpirtationDate();
        // var cartId = localStorage.anonUserCartId;
        // if (cartId) {
        //   if (confirm("Add items in Cart to your profile?")) {
        //     this.addAnonymousUsersCartToSignedInCart(cartId).subscribe(() => {
        //       console.log("added anonymous user's cart to user's cart");
        //       // alert(1);
        //       return response;
        //     }, error => {
        //       console.log(error);
        //       // alert(0);
        //       return response;
        //     })
        //   } else {
        //     return response;
        //   }
        // } else {
        //   return response;
        // }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public setAccessTokenExpirtationDate() {
    let date = new Date(Date.now());
  //  const cUser = this.authService.getLocalCurrentUser();
   // const expireVal = cUser.expires_in / (60 * 60 * 24)
   // date.setDate(date.getDate() + expireVal);
    localStorage.afrimart_access_tokenExpirationDate = date;
    console.log("Set new expiration date: " + date);
  }


  logout(reloadBrowser: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const dis = this;
      /* this.logoutApiCall().subscribe(() => {
        this.afAuth.auth.signOut().then(() => {
         this.authService.deleteFcmToken().subscribe(() => {
            dis.clearBrowserAndReload();
            resolve();
          }, error => {
            console.log(error)
            dis.clearBrowserAndReload();
            resolve();
          });
        }).catch((err) => {
          console.log(err);
          dis.clearBrowserAndReload();
          resolve();
        });
      }, error => {
        console.log(error)
        dis.clearBrowserAndReload();
        resolve();
      });*/
    });
  }

  logoutApiCall() {
   /* var currUser = this.authService.getLocalCurrentUser();
    var token;
    if (currUser) {
      token = currUser.access_token;
      // console.log(token)
    }
    return this.http.post(this.generalService.apiUrl + 'Account/Logout?token=' + token, '', this.authService.jsonTokenHeader()).pipe(
      catchError(this.handleError)
    );*/
  }

  clearBrowserAndReload(reload: boolean = true) {
    const categories = localStorage.afrimart_Categories;
    const afrimartErrorResponses = localStorage.afrimartErrorResponses;
    const afrimartLanguages = localStorage.afrimartLanguages;
    const afrimartMerchantPaymentItems = localStorage.afrimartMerchantPaymentItems;
    const currencies = localStorage.currencies;
    const topProducts = localStorage.afrimartTopProducts;
    localStorage.clear();
    localStorage.afrimartTopProducts = topProducts;
    localStorage.afrimart_Categories = categories;
    localStorage.afrimartErrorResponses = afrimartErrorResponses;
    localStorage.currencies = currencies;
    localStorage.afrimartMerchantPaymentItems = afrimartMerchantPaymentItems;
    localStorage.afrimartLanguages = afrimartLanguages;
    window.location.href = this.utilityService.getBaseUrl();
  }

  requestAccountActivationLink(email: string) {
    return this.http.get(`${this.apiUrl}Account/ResendVerification?email=${email}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  changePassword(model: ChangePasswordBindingModel) {
    // console.log(model);
    return this.http.post(`${this.apiUrl}Account/ChangePassword`, JSON.stringify(model))
      .pipe(retry(1), catchError(this.handleError));
  }

  forgotPassword(Email: string) {
    return this.http.post(`${this.apiUrl}Account/ForgotPassword?email=${Email}`, '')
      .pipe(retry(1), catchError(this.handleError));
  }

  activateAccount(data: ActivateAccountDto) {
    return this.apiService.post(`/Account/Activate`, data)
      .pipe(catchError(this.handleError));
  }

  ResetPassword(data: ResetPasswordWithCodeModel) {
    return this.http.post(`${this.apiUrl}Account/ResetPassword`, JSON.stringify(data))
      .pipe(retry(1), catchError(this.handleError));
  }

  requestNewResetPasswordLink(email: string) {
    return this.http.post(`${this.apiUrl}Account/emails/createpassword?email=${email}`, null).pipe(retry(1), catchError(this.handleError));
  }

  BecomeMerchant(user) {
    return this.http.post(`${this.apiUrl}merchant/Request`, user)
      .pipe(
       // retry(2),
         map(res => {
        this.getLoggedInUserDetails();
        return res;
      }), catchError(this.handleError));
  }

  registerUser(user: CustomerDto) {
     return this.apiService.post(`/account/register`, user);
  }


  addAnonymousUsersCartToSignedInCart(cartId: string) {
    return this.http.post(`${this.apiUrl}Shopcart/users?cart=${cartId}`, null).pipe(
      retry(1),
      map(res => { localStorage.removeItem("anonUserCartId"); return res; }),
      catchError(this.handleError)
    );
  }

 /* subscribeForEmailNotifications(EmailSubscriptionUpdateModel: EmailSubscriptionUpdateModel) {
    return this.http.put(`${this.apiUrl}notifications/emails`, EmailSubscriptionUpdateModel, this.authService.jsonTokenHeader()).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }*/

  checkProfileUpdatedPercentage(): number {
    var currUser = this.getLocalCurrentUserDet();
    var percentageProfileUpdated = 0;
    try {
      if (currUser) {
        const ol = Object.keys(currUser);
        for (let key in currUser) {
          let value = currUser[key];
          if (key != ("CurrentSubscription" && "MarketerOrganization" && "CurrentRating ") && value) {
            percentageProfileUpdated = percentageProfileUpdated + (100 / (ol.length - 3));
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
    return parseInt(`${percentageProfileUpdated}`);
  }

  getProfileStatusToBecomeAMerchantInPercentage(): number {
    var currUser = this.getLocalCurrentUserDet();
    var percentageProfileUpdated = 0;
    try {
      if (currUser) {
        if (currUser.FirstName) {
          percentageProfileUpdated = percentageProfileUpdated + 20;
        }
        if (currUser.LastName) {
          percentageProfileUpdated = percentageProfileUpdated + 20;
        }
        if (currUser.PhoneNumber) {
          percentageProfileUpdated = percentageProfileUpdated + 20;
        }
        if (currUser.DefaultCountryId) {
          percentageProfileUpdated = percentageProfileUpdated + 20;
        }
        if (currUser.DateOfBirth) {
          percentageProfileUpdated = percentageProfileUpdated + 20;
        }
      }
    } catch (error) {
      console.error(error);
    }
    return percentageProfileUpdated;
  }

  checkForMissingProfileData() {
    var currUser = this.getLocalCurrentUserDet();
    var returnRes: string = "";
    if (currUser) {
      if (!currUser.FirstName) {
        returnRes += "First Name"
      }
      if (!currUser.LastName) {
        returnRes += " Last Name"
      }
      if (!currUser.PhoneNumber) {
        returnRes += " Phone Number"
      }
      if (!currUser.DefaultCountryId) {
        returnRes += " Default Country"
      }
      if (!currUser.DateOfBirth) {
        returnRes += " Date of Birth";
      }
    }
    return returnRes;
  }
}
