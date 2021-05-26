import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LigaComponent } from './Ligas/liga.component';
import { TimeComponent } from './Times/time.component';

const routes: Routes = [
  {path: '', component:LigaComponent},
  {path: 'times/all/:league', component:TimeComponent},
  {path: ':esporte', component:LigaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
