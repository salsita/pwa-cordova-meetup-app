import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppState, reducers, effects } from './ducks';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { OfficePlanComponent } from './office-plan/office-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    OfficePlanComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      initialState: { ...new AppState() },
    }),
    EffectsModule.forRoot(effects),
    [...environment.providers],
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
