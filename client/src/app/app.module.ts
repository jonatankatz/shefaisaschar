import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/pages/register/register.component";
import {
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule
} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from "ng-otp-input";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BidiModule } from '@angular/cdk/bidi';
import { PhoneAuthComponent } from './components/phone-auth/phone-auth.component';

const config = {
  apiKey: "AIzaSyAu7b6ITys0VUl6qBUKprBB9phakYGRxPQ",
  authDomain: "shefaisaschar.firebaseapp.com",
  databaseURL: "https://shefaisaschar.firebaseio.com",
  projectId: "shefaisaschar",
  storageBucket: "shefaisaschar.appspot.com",
  messagingSenderId: "664909443120",
  appId: "1:664909443120:web:1b9579e5e175729ebbfdf5",
  measurementId: "G-BS6LNGS6ZR",
};
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PhoneAuthComponent,
  ],
  imports: [
    AngularFireAuthModule,
    HttpClientModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    BidiModule,
    MatAutocompleteModule,
    MatSelectModule,
    NgOtpInputModule
  ],
  exports: [],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, PhoneAuthComponent],
})
export class AppModule {}
