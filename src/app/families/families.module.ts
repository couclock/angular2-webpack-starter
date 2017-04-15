import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2FloatBtnModule } from 'ng2-float-btn';
import {
  RouterModule,
  PreloadAllModules,
  Routes
} from '@angular/router';
import { Md2Module } from 'md2';

import { Mv3CommonModule, Mv3MaterialModule } from '../common';

import { FamiliesComponent } from './families.component';
import { AddFamilyDialogComponent } from './add-family.component';

import { FamilyDetailComponent } from './detail/family-detail.component';
import { ChildDetailComponent } from './detail/children/detail/child-detail.component';

import { ChildrenListComponent, AddChildDialogComponent } from './detail/children';

import { FamilyDetailParentsComponent } from './detail/parents/family-detail-parents.component';
import { AddParentDialogComponent } from './detail/parents/add-parent.component';

import { FamilyDetailContactsComponent } from './detail/contacts/family-detail-contacts.component';
import { AddContactDialogComponent } from './detail/contacts/add-contact.component';

import { DeleteChildDialogComponent } from './detail/children/detail/delete-child.component';
import { InlineEditComponent } from './detail/children/detail/inline-edit.component';

import { ChildInfosComponent } from './detail/children/detail/infos';
import {
  ChildContractsComponent,
  AddContractDialogComponent
} from './detail/children/detail/contracts';

import {
  ContractDetailComponent, ContractInfosComponent, IncompleteContractDialogComponent
} from './detail/children/detail/contracts/detail';

export const ROUTES: Routes = [
  { path: 'families/:familyName/:familyId', component: FamilyDetailComponent },
  { path: 'families/:familyName/:familyId/:childName/:childId', component: ChildDetailComponent },
  {
    path: 'families/:familyName/:familyId/:childName/:childId/contracts/:contractId',
    component: ContractDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Mv3MaterialModule,
    FlexLayoutModule,
    Ng2FloatBtnModule,
    Mv3CommonModule,
    Md2Module,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  declarations: [
    FamiliesComponent,
    AddFamilyDialogComponent,
    FamilyDetailComponent,
    ChildrenListComponent,
    AddChildDialogComponent,
    FamilyDetailParentsComponent,
    AddParentDialogComponent,
    FamilyDetailContactsComponent,
    AddContactDialogComponent,
    ChildDetailComponent,
    DeleteChildDialogComponent,
    InlineEditComponent,
    ChildInfosComponent,
    ChildContractsComponent,
    AddContractDialogComponent,
    ContractDetailComponent,
    ContractInfosComponent,
    IncompleteContractDialogComponent
  ],
  entryComponents: [
    AddFamilyDialogComponent,
    AddChildDialogComponent,
    AddParentDialogComponent,
    AddContactDialogComponent,
    DeleteChildDialogComponent,
    AddContractDialogComponent,
    IncompleteContractDialogComponent
  ]
})
export class FamiliesModule { }
