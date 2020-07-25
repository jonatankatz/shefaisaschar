import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {routes} from "./app-routing.utils"


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
