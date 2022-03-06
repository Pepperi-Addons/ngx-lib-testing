import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { PepHorizontalAlignment, PepLayoutService, PepScreenSizeType } from "@pepperi-addons/ngx-lib";
import { PepColorType } from "@pepperi-addons/ngx-lib/color";
;
import { TranslateService } from "@ngx-translate/core";

import { AddonService } from "../services/addon.service";
import { ActivatedRoute, Router } from "@angular/router";

enum PepHorizontalAlignmentEnum {
    "left" = "left",
    "center" = "center",
    "right" = "right",
}

enum PepColorTypeEnum {
    'any' = 'any',
    'main' = 'main',
    'success' = 'success',
    'caution' = 'caution',
}

enum StateOfClickEnum {
    'pre' = 'pre',
    'post' = 'post',
}

interface colorAllowedOptions {
    label: string;
    value: string;
    disabled: boolean;
    xAlignment: PepHorizontalAlignment;
    type: PepColorType;
    showTitle: boolean;
    showAAComplient: boolean;
}

@Component({
    selector: "addon-module",
    templateUrl: "./color.component.html",
    styleUrls: ["./addon.component.scss"],
})
export class ColorComponent implements OnInit {

    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    screenSize: PepScreenSizeType;
    index = 0;
    arrayOfOptions: colorAllowedOptions[] = [];
    initialValues: colorAllowedOptions = {} as colorAllowedOptions;
    ShowTitle = true;
    IsDisabled = false;
    ShowAA = true;
    valueToPrint = "";
    Value = "#ccc";


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
        this.createAllAttachmentOptionsArray();
        this.Value = this.arrayOfOptions[this.index].value;
        this.initialValues.label = this.arrayOfOptions[this.index].label;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.ShowTitle = this.arrayOfOptions[this.index].showTitle;
        this.IsDisabled = this.arrayOfOptions[this.index].disabled;
        this.initialValues.type = this.arrayOfOptions[this.index].type;
        this.ShowAA = this.arrayOfOptions[this.index].showAAComplient;
        this.valueToPrint = `value:${this.Value};disabdled:${this.arrayOfOptions[this.index].disabled};xAlignment:${this.initialValues.xAlignment};type:${this.arrayOfOptions[this.index].type};
        showTitle:${this.arrayOfOptions[this.index].showTitle};showAAComplient:${this.arrayOfOptions[this.index].showAAComplient};` + this.setColor(this.initialValues.type, this.index, "pre" as StateOfClickEnum, this.IsDisabled)
            + " => " + this.setColor(this.initialValues.type, this.index, "post" as StateOfClickEnum, this.IsDisabled);
    }

    ngOnInit() { }

    openDialog() { }

    changeComponent() {
        if (this.index < this.arrayOfOptions.length - 1) this.index++;
        else {
            alert("color testing ended");
            this.index = 0;
        }
        console.log(`style changed`);
        this.initialValues.value = this.arrayOfOptions[this.index].value;
        this.initialValues.label = this.arrayOfOptions[this.index].label;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.ShowTitle = this.arrayOfOptions[this.index].showTitle;
        this.IsDisabled = this.arrayOfOptions[this.index].disabled;
        this.initialValues.type = this.arrayOfOptions[this.index].type;
        this.ShowAA = this.arrayOfOptions[this.index].showAAComplient;
        this.valueToPrint = `value:${this.arrayOfOptions[this.index].value};disabdled:${this.arrayOfOptions[this.index].disabled};xAlignment:${this.initialValues.xAlignment};type:${this.arrayOfOptions[this.index].type};
        showTitle:${this.arrayOfOptions[this.index].showTitle};showAAComplient:${this.arrayOfOptions[this.index].showAAComplient};` + this.setColor(this.initialValues.type, this.index, "pre" as StateOfClickEnum, this.IsDisabled) + " => "
            + this.setColor(this.initialValues.type, this.index, "post" as StateOfClickEnum, this.IsDisabled);
    }

    createAllAttachmentOptionsArray() {
        this.createAttachmentWithAllhorizontalAlignmentOptions();
        for (let index = 0; index < Object.keys(PepColorTypeEnum).length; index++) {
            let colorType = PepColorTypeEnum[Object.keys(PepColorTypeEnum)[index]];
            for (let index1 = 0; index1 < 2; index1++) {
                let showTitle = index1 ? true : false;
                for (let index2 = 0; index2 < 2; index2++) {
                    let showAAComplient = index2 ? true : false;
                    let option: colorAllowedOptions = {
                        label: "choose color",
                        value: "#ccc",
                        disabled: false,
                        xAlignment: "center",
                        type: colorType,
                        showTitle: showTitle,
                        showAAComplient: showAAComplient,
                    };
                    this.arrayOfOptions.push(option);
                }
            }
        }

    }


    gotoCheckbox() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Checkbox`);
    }

    createAttachmentWithAllhorizontalAlignmentOptions() {
        for (let index = 0; index < Object.keys(PepHorizontalAlignmentEnum).length; index++) {
            let horizontalAlignment = PepHorizontalAlignmentEnum[Object.keys(PepHorizontalAlignmentEnum)[index]];
            let option: colorAllowedOptions = {
                label: "choose color",
                value: index == Object.keys(PepHorizontalAlignmentEnum).length - 2 ? "#bca" : "#ccc",
                disabled: false,
                xAlignment: horizontalAlignment,
                type: "any",
                showTitle: true,
                showAAComplient: true,
            };
            this.arrayOfOptions.push(option);
        }
        let option: colorAllowedOptions = {
            label: "choose color",
            value: "#ccc",
            disabled: true,
            xAlignment: "center",
            type: "any",
            showTitle: true,
            showAAComplient: true,
        };
        this.arrayOfOptions.push(option);
    }

    valueChange() {
        console.log("color changed");
    }

    setColor(colorType: PepColorType, index: number, stateOfClickEnum: StateOfClickEnum, isDisabled: boolean): string {
        if (!isDisabled) {
            switch (colorType) {
                case "any":
                    switch (index) {
                        case 0:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(204,204,204,1)";
                                case "post":
                                    return "rgba(204,199,199,1)/rgba(209,73,5,1)";
                            }
                        case 1:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(204,199,199,1)";
                                case "post":
                                    return "rgba(205,195,193,1)";
                            }
                        case 2:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(205,195,193,1)";
                                case "post":
                                    return "rgba(205,192,188,1)";
                            }//3 is disabled
                        case 4:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(205,192,188,1)";
                                case "post":
                                    return "rgba(206,190,182,1)";
                            }
                        case 5:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(206,190,182,1)";
                                case "post":
                                    return "rgba(207,189,175,1)";
                            }
                        case 6:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(207,189,175,1)";
                                case "post":
                                    return "rgba(209,189,169,1)";
                            }
                        case 7:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(209,189,169,1)";
                                case "post":
                                    return "rgba(210,190,162,1)";
                            }
                    }
                case "main":
                    switch (index) {
                        case 8:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(210,190,162,1)/rgba(17,13,8,1)";
                                case "post":
                                    return "rgba(14,12,6,1)";
                            }
                        case 9:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(14,12,6,1)";
                                case "post":
                                    return "rgba(11,9,4,1)";
                            }
                        case 10:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(11,9,4,1)";
                                case "post":
                                    return "rgba(8,7,3,1)";
                            }
                        case 11:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(8,7,3,1)";
                                case "post":
                                    return "rgba(4,4,1,1)";
                            }
                    }
                case "success":
                    switch (index) {
                        case 12:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(4,4,1,1)/rgba(104,198,57,1)";
                                case "post":
                                    return "rgba(87,200,50,1)";
                            }
                        case 13:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(87,200,50,1)";
                                case "post":
                                    return "rgba(69,202,43,1)";
                            }
                        case 14:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(69,202,43,1)";
                                case "post":
                                    return "rgba(50,204,36,1)";
                            }
                        case 15:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(50,204,36,1)";
                                case "post":
                                    return "rgba(29,205,29,1)";
                            }
                    }
                case "caution":
                    switch (index) {
                        case 16:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(29,205,29,1)/rgba(205,59,29,1)";
                                case "post":
                                    return "rgba(207,69,23,1)";
                            }
                        case 17:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(207,69,23,1)";
                                case "post":
                                    return "rgba(208,80,17,1)";
                            }
                        case 18:
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(208,80,17,1)";
                                case "post":
                                    return "rgba(208,77,11,1)";
                            }
                        case 19://need fix{?}
                            switch (stateOfClickEnum) {
                                case "pre":
                                    return "rgba(208,77,11,1)";
                                case "post":
                                    return "rgba(209,73,5,1)";
                            }
                    }
            }
        } else
            return "NONE";
    }

    gotoDate(){
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Date`);
    }

}

