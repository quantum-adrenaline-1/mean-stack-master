import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  /**
   * 'declaration' property has the declaration of all the user created components
   * these declarations are used while 'ng' tool refers app.module.ts for bootstraping building and running the application
   */
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  /**
   * 'imports' lists all the standard modules provided by the Angular framework
   */
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  /**
   * 'providers' is the list of all the helpers / 'help providers'
   */
  providers: [authInterceptorProviders],
  /**
   * 'bootstrap' is the property that references a component which is the root component of the application
   * This component links and associates with all the other components in the application
   * This component is used by app.module.ts to bootstrap the application during building or executing the application
   */
  bootstrap: [AppComponent]
})
export class AppModule { }
