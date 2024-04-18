import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonFormComponent } from './Home/person-form/person-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByNamePipe } from './filter-by-name.pipe';
import { PersonCardComponent } from './Home/person-card/person-card.component';
import { CalculateAgePipe } from './calculate-age.pipe';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    FilterByNamePipe,
    PersonCardComponent,
    CalculateAgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
