import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
//import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SocialLoginDataModel, FacebookLoginResponseDataModel, GoogleLoginResponseDataModel, ThirdPartyModel, ApplicationUserViewModel } from 'src/app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-social-login-providers',
  templateUrl: './social-login-providers.component.html',
  styleUrls: ['./social-login-providers.component.css']
})
export class SocialLoginProvidersComponent implements OnInit {

  constructor(
    //private authService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  // socialLoginData: SocialLoginDataModel;
  loading: boolean;

  ngOnInit() {
  }

  loginWithFacebook() {
    if (!this.loading) {
      this.loading = true;
      /*this.authService.doFacebookLogin().then((res) => {
        this.sendThirdPartyCred(res);
      }).catch(error => {
        this.loading = false;
        this.toastr.error(error || "Something went wrong!", "Error!")
      });*/
    }

  }

  loginWithGoogle() {
    if (!this.loading) {
      this.loading = true;
     /* this.authService.doGoogleLogin().then((res) => {
        this.sendThirdPartyCred(res);
      }).catch(error => {
        this.loading = false;
        this.toastr.error(error || "Something went wrong!", "Error!")
      });*/
    }

  }


  sendThirdPartyCred(thirdPartyCredential: SocialLoginDataModel) {
    console.log(thirdPartyCredential);
    const data: ThirdPartyModel = {
      AccessToken: thirdPartyCredential.access_token,
      Provider: thirdPartyCredential.providerId.replace(".com", "")
    }
    // console.log(thirdPartyCredential, data)
    this.userService.RegisterExternal(data).subscribe(
      () => {
        this.userService.getLoggedInUserDetails().subscribe(
          UserData => {
            // console.log(UserData)
            localStorage.afrimartUserProfilePicture = thirdPartyCredential.picture_url;
           /* this.userService.GetUserImage(UserData.ApplicationUserId).subscribe(
              data => {
                this.loading = false;
                if (!data.ImageData) {
                  this.uploadThirdPartyProfilePic(thirdPartyCredential.picture_url, UserData);
                } else {
                  localStorage.afrimartUserProfilePicture = data.ImageData;
                  this.userService.successfulLoginFuncs(UserData);
                }
              }, () => {
                this.loading = false;
                this.userService.successfulLoginFuncs(UserData);
              }
            );*/
          }, error => {
            this.loading = false;
            console.log(error);
          }
        );
      }, error => {
        this.loading = false;
        this.toastr.error('Account registration failed!', error || "Something went wrong", {
          positionClass: "toast-bottom-center",
          tapToDismiss: true,
          timeOut: 10000,
          progressBar: true
        });
      }
    );
  }

  uploadThirdPartyProfilePic(picurl: string, UserData: ApplicationUserViewModel) {
    this.userService.updateUserProfilePictureThirdParty({ url: picurl }).subscribe(
      data => {
        console.log('Profile Picture updated');
        this.userService.successfulLoginFuncs(UserData);
      }, error => {
        console.log('Profile Picture update failed');
        this.userService.successfulLoginFuncs(UserData);
      }
    );
  }

}
