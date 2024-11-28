import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MomentPipe} from './pipes/moment.pipe';

@NgModule({
  declarations: [NavbarComponent, MomentPipe],
  imports: [CommonModule, NgbCollapseModule, RouterLink, RouterLinkActive, NgbModule],
  exports: [NavbarComponent, MomentPipe]
})
export class SharedModule {
}
