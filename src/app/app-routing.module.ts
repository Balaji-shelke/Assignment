import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './Home/person-form/person-form.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {path:'',component:AppComponent},
  // {
  //   path: '/add-person',component:PersonFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
