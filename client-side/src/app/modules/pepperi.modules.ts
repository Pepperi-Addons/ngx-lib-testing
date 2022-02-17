// Examples how to import all @pepperi-addons/ngx-lib
// Recommended to import only needed components for optimization

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { PepNgxLibModule, PepAddonService, PepFileService } from '@pepperi-addons/ngx-lib';
import { PepAttachmentModule } from '@pepperi-addons/ngx-lib/attachment';
import { PepCheckboxModule } from '@pepperi-addons/ngx-lib/checkbox';
import { PepColorModule } from '@pepperi-addons/ngx-lib/color';
import { PepDateModule } from '@pepperi-addons/ngx-lib/date';
import { PepGroupButtonsModule } from '@pepperi-addons/ngx-lib/group-buttons';
import { PepImageModule } from '@pepperi-addons/ngx-lib/image';
import { PepImagesFilmstripModule } from '@pepperi-addons/ngx-lib/images-filmstrip';
import { PepQuantitySelectorModule } from '@pepperi-addons/ngx-lib/quantity-selector';
import { PepRichHtmlTextareaModule } from '@pepperi-addons/ngx-lib/rich-html-textarea';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepSeparatorModule } from '@pepperi-addons/ngx-lib/separator';
import { PepSignatureModule } from '@pepperi-addons/ngx-lib/signature';
import { PepSizeDetectorModule } from '@pepperi-addons/ngx-lib/size-detector';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { PepListModule } from '@pepperi-addons/ngx-lib/list';
import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';


// import {PepAttachmentModule} from '@pepperi-addons/ngx-lib/attachment';
// const pepIcons = [
//     pepIconSystemBolt,
//     pepIconNoImage,
//     pepIconArrowTwoWaysVerT,
//     pepIconArrowDown,
//     pepIconArrowUp,
//     pepIconArrowRightAlt,
//     pepIconArrowLeftAlt,
//     pepIconArrowDownAlt,
//     pepIconArrowUpAlt,
//     pepIconNumberNumber,
//     pepIconNumberPlus,
//     pepIconSystemBin,
//     pepIconSystemEdit,
//     pepIconSystemClose,
//     pepIconSystemFilter,
//     pepIconSystemMenu,
//     pepIconSystemHome,
//     pepIconSystemSettings,
//     pepIconSystemQuestion,
//     pepIconSystemAvatar,
//     pepIconSystemDoor,
//     pepIconSystemPrint,
//     pepIconSystemSearch,
//     pepIconSystemSpinner,
//     pepIconSystemInfo,
//     pepIconShoppingCart,
//     pepIconTimeCal,
//     pepIconViewCardLg,
//     pepIconViewCardMd,
//     pepIconViewCardSm,
//     pepIconViewTable,
//     pepIconViewMatrix,
//     pepIconViewLine
// ];

const pepperiComponentsModules = [
    PepAttachmentModule,
    PepCheckboxModule,
    PepColorModule,
    PepDateModule,
    PepGroupButtonsModule,
    PepImageModule,
    PepImagesFilmstripModule,
    PepListModule,
    PepCheckboxModule,
    PepQuantitySelectorModule,
    PepRichHtmlTextareaModule,
    PepSelectModule,
    PepSeparatorModule,
    PepSignatureModule,
    PepSizeDetectorModule,
    PepTextareaModule,
    PepTextboxModule,
   //  PepIconModule,
    PepMenuModule,
    PepButtonModule,
    PepTopBarModule
];

import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
   imports:[PepAttachmentModule]
})
export class PepUIModule {}