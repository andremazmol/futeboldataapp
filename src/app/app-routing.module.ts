import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LigaComponent } from './Ligas/liga.component';
import { TimeComponent } from './Times/time.component';

const routes: Routes = [
  {path: '', component:LigaComponent},
  {path: 'times/all/:league', component:TimeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
