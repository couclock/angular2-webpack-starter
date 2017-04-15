import { NgModule } from '@angular/core';

import {
  MdDialogModule,
  MdTabsModule,
  MdSnackBarModule,
  MdSidenavModule,
  MdIconModule,
  MdToolbarModule,
  MdMenuModule,
  MdInputModule,
  MdSelectModule,
  MdChipsModule,
  MdListModule,
  MdButtonModule,
  MdCardModule,
  MdRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    MdDialogModule,
    MdTabsModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdMenuModule,
    MdInputModule,
    MdSelectModule,
    MdChipsModule,
    MdListModule,
    MdButtonModule,
    MdCardModule,
    MdRadioModule
  ],
  exports: [
    MdDialogModule,
    MdTabsModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdMenuModule,
    MdInputModule,
    MdSelectModule,
    MdChipsModule,
    MdListModule,
    MdButtonModule,
    MdCardModule,
    MdRadioModule
  ]
})
export class Mv3MaterialModule { }
