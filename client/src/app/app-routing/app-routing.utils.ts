import { Routes, Route } from "@angular/router";
import { HomeComponent } from "../components/pages/home/home.component";
import { RegisterComponent} from '../components/pages/register/register.component';
interface CustomRoute extends Route {
  children?: Array<CustomRoute>;
  title?: string;
  isVisible?: boolean;
}

export const routes: Array<CustomRoute> = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  {
    path: "Home",
    component: HomeComponent,
    title: "Home",
    isVisible: false,
  },
  {
    path: "Home",
    component: RegisterComponent,
    title: "Register",
    isVisible: false,
  },
  
];
