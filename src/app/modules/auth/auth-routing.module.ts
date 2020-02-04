import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { NoAuthGuard } from './no-auth.guard';
import { RegistrationComponent } from "./registration/registration.component";
import { ActivateAccountComponent } from "./activate-account/activate-account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { CanActivateViaAuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [NoAuthGuard]
            },
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'register',
                redirectTo: 'registration',
                pathMatch: 'full'
            },
            {
                path: 'activate-account',
                component: ActivateAccountComponent
            },
            {
                path: 'activate-account/:email/:code',
                component: ActivateAccountComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,
                canActivate: [CanActivateViaAuthGuard]
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'reset-password',
                component: ResetPasswordComponent
            },
            {
                path: 'reset-password/:email/:code',
                component: ResetPasswordComponent
            }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {  static components = [
  LoginComponent,
  ForgotPasswordComponent,
  NotFoundComponent,
  ResetPasswordComponent,

];}
