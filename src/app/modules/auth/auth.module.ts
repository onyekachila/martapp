import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { PipesModule } from "src/app/shared/pipes/pipes.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ActivateAccountComponent } from "./activate-account/activate-account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SocialLoginProvidersComponent } from "./social-login-providers/social-login-providers.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NoAuthGuard } from './no-auth.guard';
import { CanActivateViaAuthGuard } from './auth.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        PipesModule,
        SharedModule
    ],
    declarations: [AuthComponent, LoginComponent, RegistrationComponent, ForgotPasswordComponent, ActivateAccountComponent, ChangePasswordComponent, SocialLoginProvidersComponent, ResetPasswordComponent],
    exports: [SocialLoginProvidersComponent],
    providers: [NoAuthGuard, CanActivateViaAuthGuard]
})
export class AuthModule { }
