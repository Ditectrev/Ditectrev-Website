import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { SharedModule } from './../../../../libs/shared/src/index';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: NotFoundComponent }]),
    SharedModule
  ]
})
export class NotFoundModule {}
