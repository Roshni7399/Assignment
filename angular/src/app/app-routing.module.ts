import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from "./pages/signup/signup.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
