import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { RefreshmentsComponent } from './refreshments/refreshments.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    OfficePlanComponent,
    RefreshmentsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
