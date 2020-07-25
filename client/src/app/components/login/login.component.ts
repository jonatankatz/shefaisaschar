import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from "@angular/material"
import {RegisterComponent}  from "../pages/register/register.component"
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {

  constructor(public  dialog:MatDialog) {
  
  }
 openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

