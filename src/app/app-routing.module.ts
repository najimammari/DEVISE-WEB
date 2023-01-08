import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeclarationComponent} from "./declaration/declaration.component";

const routes: Routes = [
  {
    path: 'declaration',
    component: DeclarationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
