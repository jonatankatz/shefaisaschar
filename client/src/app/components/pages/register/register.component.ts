import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormControl } from "@angular/forms";
import { MustMatch } from "../../../utils/mustMatch"
import { MatDialog, MatDialogConfig } from "@angular/material";
import {  debounceTime  } from 'rxjs/operators';
import { AddressService } from "../../../services/address/address.service"
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';

function isValidIsraeliID(control: FormControl){
  var sID = String(control.value);
  if (sID.length != 9) return { isValidId: { parsedId: sID } };
  var counter = 0, incNum;
  for (var i = 0; i < 9; i++) {
    incNum = Number(sID.charAt(i));
    incNum *= (i % 2) + 1;
    if (incNum > 9) incNum -= 9;
    counter += incNum;
  } 
  if (counter % 10 === 0) return null;
  return { isValidId: { parsedId: sID } }
}


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  isLinear = false;
  public firstFormGroup;
  public secondFormGroup;
  public firstFormButton;
  public cities;
  public streets;

  public unSubscribeSearchTextChanges: Subscription;
  public unSubscribeSearchTextChanges2: Subscription;
  constructor(
    private _formBuilder: FormBuilder,
    private AddressService: AddressService,
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        israeliId: ["", [isValidIsraeliID, Validators.required]],
        email: [
          "",
          [
            Validators.pattern(
              /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            ),
            Validators.required,
          ],
        ],
        password: [
          "",
          [
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            ),
            Validators.required,
          ],
        ],
        passwordVld: ["", Validators.required],
      },
      { validator: MustMatch("password", "passwordVld") }
    );
    this.secondFormGroup = this._formBuilder.group({
      city: ["", Validators.required],
      street: ["", Validators.required],
      house: ["", Validators.required],
      apt: ["", Validators.required],
      telephone: [
        "",
        [Validators.pattern(/^05\d([-]{0,1})\d{7}$/), Validators.required],
      ],
    });
    this.cities = [];
    this.streets = [];
    this.firstFormButton = true;

    this.unSubscribeSearchTextChanges = this.secondFormGroup.controls.city.valueChanges
      .pipe(debounceTime(300))
      .subscribe((newValue: String) => {
        const result = this.AddressService.getCity(newValue).subscribe(
          (cities: any) => {
            const searchResults = cities.result;
            this.cities = searchResults;
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log("complete!");
          }
        );
      });
    this.unSubscribeSearchTextChanges2 = this.secondFormGroup.controls.street.valueChanges
      .pipe(debounceTime(300))
      .subscribe((newValue: String) => {
        const city = this.secondFormGroup.get("city").value;
        console.log(city, newValue);

        const result = this.AddressService.getStreet(city, newValue).subscribe(
          (streets: any) => {
            console.log("data arrived!");
            console.log(streets);
            const searchResults = streets.result;
            this.streets = searchResults;
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log("complete!");
          }
        );

        console.log(newValue);
      });
  }
  get first() {
    return this.firstFormGroup.controls;
  }
  get second() {
    return this.secondFormGroup.controls;
  }
 
  register() {
    console.log(this.firstFormGroup);
  }
}
