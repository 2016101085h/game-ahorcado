import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/pages/home/home.component';

const appRoutes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true}),


  ],
  exports: [RouterModule],
  providers: [],
})
export class FeatureRoutingModule {}

