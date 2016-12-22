import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArtdetailComponent} from "./artdetail/artdetail.component";
import {ArtComponent} from "./art/art.component";

const routes: Routes = [
  { path: '', component: ArtComponent },
  { path: ':year', component: ArtComponent },
  { path: ':year/:id', component: ArtdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
