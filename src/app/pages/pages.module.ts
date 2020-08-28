import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from "./pages.component";

import { HeaderComponent } from './shared/header/header.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { quizContentComponent } from './quiz/content.component';


@NgModule({
  declarations: [PagesComponent, HeaderComponent, SideMenuComponent, quizContentComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class PagesModule { }
