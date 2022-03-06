import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";

import { PepNgxLibModule, PepAddonService } from "@pepperi-addons/ngx-lib";
import { PepTopBarModule } from "@pepperi-addons/ngx-lib/top-bar";
import { PepSizeDetectorModule } from "@pepperi-addons/ngx-lib/size-detector";
import { PepPageLayoutModule } from "@pepperi-addons/ngx-lib/page-layout";
import {
  PepIconRegistry,
  PepIconModule,
  pepIconSystemClose,
} from "@pepperi-addons/ngx-lib/icon";
import { PepButtonModule } from "@pepperi-addons/ngx-lib/button";
import { PepAttachmentModule } from "@pepperi-addons/ngx-lib/attachment";
import { PepDialogModule } from "@pepperi-addons/ngx-lib/dialog";
import { PepMenuModule } from "@pepperi-addons/ngx-lib/menu";
import { PepColorModule } from "@pepperi-addons/ngx-lib/color";
// import { PepListModule } from '@pepperi-addons/ngx-lib/list';
// import { PepSearchModule } from '@pepperi-addons/ngx-lib/search';

import { PepGenericListModule } from "@pepperi-addons/ngx-composite-lib/generic-list";

import { PepTextboxModule } from "@pepperi-addons/ngx-lib/textbox";

import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from "@ngx-translate/core";

import { AddonService } from "../services/addon.service";
import { AddonComponentButtons } from "./index";
import { AttachmentComponent } from "./index";
import { CheckboxComponent } from "./index";
import { PepCheckboxModule } from "@pepperi-addons/ngx-lib/checkbox";
import { ColorComponent } from "./index";

const pepIcons = [pepIconSystemClose];

export const routes: Routes = [
  {
    path: "",
    component: AddonComponentButtons,
  },
  {
    path: "",
    component: AttachmentComponent,
  },
];

@NgModule({
  declarations: [AddonComponentButtons, AttachmentComponent, CheckboxComponent, ColorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PepNgxLibModule,
    PepSizeDetectorModule,
    PepTopBarModule,
    PepPageLayoutModule,
    PepSizeDetectorModule,
    MatIconModule,
    PepIconModule,
    PepCheckboxModule,
    PepTopBarModule,
    PepMenuModule,
    PepPageLayoutModule,
    PepButtonModule,
    PepAttachmentModule,
    // PepColorService,
    PepColorModule,
    PepDialogModule,
    // PepListModule,
    // PepSearchModule,
    PepTextboxModule,
    MatDialogModule,
    PepGenericListModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (addonService: PepAddonService) =>
          PepAddonService.createMultiTranslateLoader(addonService, [
            "ngx-lib",
            "ngx-composite-lib",
          ]),
        deps: [PepAddonService],
      },
    }),
    RouterModule.forChild(routes),
  ],
  exports: [AddonComponentButtons],
  providers: [
    TranslateStore,
    // When loading this module from route we need to add this here (because only this module is loading).
    AddonService,
  ],
})
export class AddonModule {
  constructor(
    translate: TranslateService,
    private pepIconRegistry: PepIconRegistry,
    private pepAddonService: PepAddonService
  ) {
    this.pepAddonService.setDefaultTranslateLang(translate);
    this.pepIconRegistry.registerIcons(pepIcons);
  }
}
