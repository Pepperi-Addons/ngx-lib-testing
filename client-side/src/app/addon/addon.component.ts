import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from "@pepperi-addons/ngx-lib";
import { TranslateService } from "@ngx-translate/core";

import { AddonService } from "../services/addon.service";
import { ActivatedRoute, Router } from "@angular/router";

import {
    PepStyleType,
    PepStyleStateType,
    PepSizeType,
} from "@pepperi-addons/ngx-lib";

import { PepIconType } from "@pepperi-addons/ngx-lib/icon";

enum PepStyleTypeEnum {
    "weak" = "weak",
    "weak-invert" = "weak-invert",
    "regular" = "regular",
    "strong" = "strong",
}

enum PepStyleStateTypeEnum {
    "system" = "system",
    "caution" = "caution",
    "success" = "success",
}

enum PepSizeTypeEnum {
    "xs" = "xs",
    "sm" = "sm",
    "md" = "md",
    "lg" = "lg",
    "xl" = "xl",
}

enum PepIconTypeEnum {
    "arrow_back_left" = "arrow_back_left",
    "arrow_back_right" = "arrow_back_right",
    "arrow_back" = "arrow_back",
    "arrow_down_alt" = "arrow_down_alt",
    "arrow_down" = "arrow_down",
    "arrow_either" = "arrow_either",
    "arrow_left_alt" = "arrow_left_alt",
    "arrow_left" = "arrow_left",
    "arrow_right_alt" = "arrow_right_alt",
    "arrow_right" = "arrow_right",
    "arrow_two_ways_hor_l" = "arrow_two_ways_hor_l",
    "arrow_two_ways_hor_r" = "arrow_two_ways_hor_r",
    "arrow_two_ways_ver_b" = "arrow_two_ways_ver_b",
    "arrow_two_ways_ver_t" = "arrow_two_ways_ver_t",
    "arrow_up_alt" = "arrow_up_alt",
    "arrow_up" = "arrow_up",
    "barnd_pepperi" = "barnd_pepperi",
    "device_desktop" = "device_desktop",
    "device_mobile" = "device_mobile",
    "device_tablet" = "device_tablet",
    "indicator_dot_placeholder" = "indicator_dot_placeholder",
    "misc_excel" = "misc_excel",
    "no_image_2" = "no_image_2",
    "no_image" = "no_image",
    "number_coins" = "number_coins",
    "number_decimal" = "number_decimal",
    "number_dollar" = "number_dollar",
    "number_euro" = "number_euro",
    "number_minus" = "number_minus",
    "number_number" = "number_number",
    "number_percent" = "number_percent",
    "number_plus" = "number_plus",
    "ripples_transparent" = "ripples_transparent",
    "shopping_cart" = "shopping_cart",
    "shopping_paper" = "shopping_paper",
    "system_attach" = "system_attach",
    "system_avatar" = "system_avatar",
    "system_bin" = "system_bin",
    "system_bolt" = "system_bolt",
    "system_chat" = "system_chat",
    "system_circle" = "system_circle",
    "system_close" = "system_close",
    "system_doc" = "system_doc",
    "system_door" = "system_door",
    "system_dot_ellipsis" = "system_dot_ellipsis",
    "system_edit" = "system_edit",
    "system_education" = "system_education",
    "system_email" = "system_email",
    "system_file_download" = "system_file_download",
    "system_file_upload_cloud" = "system_file_upload_cloud",
    "system_file_upload" = "system_file_upload",
    "system_filter_2" = "system_filter_2",
    "system_filter" = "system_filter",
    "system_folder" = "system_folder",
    "system_full_screen" = "system_full_screen",
    "system_heart" = "system_heart",
    "system_home" = "system_home",
    "system_info" = "system_info",
    "system_inventory" = "system_inventory",
    "system_link" = "system_link",
    "system_map" = "system_map",
    "system_menu_dots" = "system_menu_dots",
    "system_menu" = "system_menu",
    "system_move" = "system_move",
    "system_must" = "system_must",
    "system_off_line" = "system_off_line",
    "system_ok" = "system_ok",
    "system_pause" = "system_pause",
    "system_phone" = "system_phone",
    "system_play" = "system_play",
    "system_print" = "system_print",
    "system_processing" = "system_processing",
    "system_question" = "system_question",
    "system_rotate_device" = "system_rotate_device",
    "system_search" = "system_search",
    "system_select" = "system_select",
    "system_settings" = "system_settings",
    "system_signature" = "system_signature",
    "system_spinner" = "system_spinner",
    "system_support" = "system_support",
    "system_texterea" = "system_texterea",
    "system_tool" = "system_tool",
    "system_view" = "system_view",
    "text_align_center" = "text_align_center",
    "text_align_left" = "text_align_left",
    "text_align_right" = "text_align_right",
    "time_cal" = "time_cal",
    "time_datetime" = "time_datetime",
    "time_duration" = "time_duration",
    "time_time" = "time_time",
    "view_card_lg" = "view_card_lg",
    "view_card_md" = "view_card_md",
    "view_card_sm" = "view_card_sm",
    "view_line" = "view_line",
    "view_matrix" = "view_matrix",
    "view_table" = "view_table",
}

interface buttonAllowedOptions {
    value: string;
    style: PepStyleType;
    stateStyle: PepStyleStateType;
    size: PepSizeType;
    disabled: boolean;
    visibale: boolean;
    iconType?: PepIconType;
}

@Component({
    selector: "addon-module",
    templateUrl: "./addon.component.html",
    styleUrls: ["./addon.component.scss"],
})
export class AddonComponent implements OnInit {

    arrayOfOptions: buttonAllowedOptions[] = [];
    initialValues: buttonAllowedOptions = {} as buttonAllowedOptions;
    index = 0;

    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    screenSize: PepScreenSizeType;

    constructor(
        public addonService: AddonService,
        public router: Router,
        public route: ActivatedRoute,
        public layoutService: PepLayoutService,
        public translate: TranslateService
    ) {
        this.layoutService.onResize$.subscribe((size) => {
            this.screenSize = size;
        });
        this.createAllButtonOptionsArray();
        this.initialValues.value = this.arrayOfOptions[this.index].value;
        this.initialValues.style = this.arrayOfOptions[this.index].style;
        this.initialValues.stateStyle = this.arrayOfOptions[this.index].stateStyle;
        this.initialValues.size = this.arrayOfOptions[this.index].size;
        this.initialValues.iconType = this.arrayOfOptions[this.index].iconType;
    }

    ngOnInit() { }

    openDialog() { }

    changeComponent() {
        if (this.index < this.arrayOfOptions.length - 1) this.index++;
        else {
            alert("button testing ended");
            this.index = 0;
        }

        console.log(`style changed`);
        this.initialValues.value = this.arrayOfOptions[this.index].value;
        this.initialValues.style = this.arrayOfOptions[this.index].style;
        this.initialValues.stateStyle = this.arrayOfOptions[this.index].stateStyle;
        this.initialValues.size = this.arrayOfOptions[this.index].size;
        this.initialValues.iconType = this.arrayOfOptions[this.index].iconType;
    }

    printComponentValue(buttonComp) {
        console.log(`clicked button: ${buttonComp.value}`);
    }

    createAllButtonOptionsArray() {
        this.createIconButtonsInArray();
        for (let index = 0; index < Object.keys(PepStyleTypeEnum).length; index++) {
            let style = PepStyleTypeEnum[Object.keys(PepStyleTypeEnum)[index]];
            for (let index1 = 0; index1 < Object.keys(PepStyleStateTypeEnum).length; index1++) {
                let stateStyle = PepStyleStateTypeEnum[Object.keys(PepStyleStateTypeEnum)[index1]];
                loop3:
                for (let index2 = 0; index2 < Object.keys(PepSizeTypeEnum).length; index2++) {
                    if (index === 0 && index1 === 0 && index2 === 0) {
                        continue loop3;
                    }
                    let size = PepSizeTypeEnum[Object.keys(PepSizeTypeEnum)[index2]];
                    let value = style + " " + stateStyle + " " + size;
                    let option: buttonAllowedOptions = {
                        value: value,
                        style: style as PepStyleType,
                        stateStyle: stateStyle as PepStyleStateType,
                        size: size as PepSizeType,
                        disabled: false,
                        visibale: false,
                    };
                    this.arrayOfOptions.push(option);
                }
            }
        }

    }


    createIconButtonsInArray() {
        for (let styleType in PepStyleTypeEnum) {

            let style = styleType as PepStyleType;
            let stateStyle = PepStyleStateTypeEnum[Object.keys(PepStyleStateTypeEnum)[0]];
            let size = PepSizeTypeEnum[Object.keys(PepSizeTypeEnum)[0]];
            let value = style + " " + stateStyle + " " + size + " icon";

            for (let icon in PepIconTypeEnum) {
                let iconType = icon as PepIconType;
                let option: buttonAllowedOptions = {
                    value: value,
                    style: style as PepStyleType,
                    stateStyle: stateStyle as PepStyleStateType,
                    size: size as PepSizeType,
                    disabled: false,
                    visibale: false,
                    iconType: iconType
                };
                this.arrayOfOptions.push(option);
            }
            return;
        }
    }
}
