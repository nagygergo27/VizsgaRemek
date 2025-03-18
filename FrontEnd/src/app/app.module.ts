import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings/settings.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NewComponent } from './new/new.component';
import { AboutComponent } from './about/about.component';
import { BasketComponent } from './basket/basket.component';
import { UsComponent } from './us/us.component';


import { environments } from '../environments/environments';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,    
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    SettingsComponent,
    FooterComponent,
    NewComponent,
    AboutComponent,
    BasketComponent,
    ProductsComponent,
    HomeComponent,
    UsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environments.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
