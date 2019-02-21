import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; //Angular routing islemlerini saglayan module
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, //default route is HomeComponent
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent } //any other paths redirect to home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //imports routes arrayini parametre olarak alir.
  exports: [RouterModule]
})
export class AppRoutingModule { } //app.module.ts (our main configuration) icerisinde import edebilmek icin export edilir
//daha sonra UI parcalarini yani componentleri olusturup burada link edilmesini saglariz