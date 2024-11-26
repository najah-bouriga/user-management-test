import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AgGridModule} from 'ag-grid-angular';
import {ModalComponent} from './components/modal/modal.component';
import {MomentPipe} from './pipes/moment.pipe';

@NgModule({
  declarations: [NavbarComponent, ModalComponent, MomentPipe],
  imports: [CommonModule, NgbCollapseModule, RouterLink, RouterLinkActive, AgGridModule, NgbModule],
  exports: [NavbarComponent, ModalComponent, MomentPipe]
})
export class SharedModule {
}
