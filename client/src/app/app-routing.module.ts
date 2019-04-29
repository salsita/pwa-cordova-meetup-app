import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OfficePlanComponent } from './office-plan/office-plan.component';
import { RefreshmentsComponent } from './refreshments/refreshments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'refreshments', component: RefreshmentsComponent },
  { path: 'office-plan', component: OfficePlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
