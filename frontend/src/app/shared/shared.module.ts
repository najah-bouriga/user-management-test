import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [NavbarComponent, CommonModule],
})
export class SharedModule {}
