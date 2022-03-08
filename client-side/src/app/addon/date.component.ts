import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { PepHorizontalAlignment, PepLayoutService, PepScreenSizeType, PepDateFieldType } from "@pepperi-addons/ngx-lib";
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

enum PepDateFieldTypeEnum {
    'date' = 'date',
    'datetime' = 'datetime',
}


interface dateAllowedOptions {
    value: string;
    label: string;
    type: PepDateFieldType;
    mandatory: boolean,
    disabled: boolean;
    textColor: string,
    xAlignment: PepHorizontalAlignment;
    showTitle: boolean;
    renderTitle: boolean;
    renderError: boolean;
    renderSymbol: boolean;
}

@Component({
    selector: "addon-module",
    templateUrl: "./date.component.html",
    styleUrls: ["./addon.component.scss"],
})
export class DateComponent implements OnInit {

    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    screenSize: PepScreenSizeType;
    index = 0;
    arrayOfOptions: dateAllowedOptions[] = [];
    initialValues: dateAllowedOptions = {} as dateAllowedOptions;
    ShowTitle = true;
    IsDisabled = false;
    ShowAA = true;
    IsMandatory = true;
    RenderTitle = true;
    RenderError = true;
    RenderSymbol = true;
    valueToPrint = "";
    Value = "#ccc";
    textColors = ["#aaa000", "#bbbfff", "#dd0000"];
    ValueDate = "01/02/2020";

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
        this.initialValues.value = this.arrayOfOptions[this.index].value;
        this.initialValues.label = this.arrayOfOptions[this.index].label;
        this.initialValues.type = this.arrayOfOptions[this.index].type;
        this.IsMandatory = this.arrayOfOptions[this.index].mandatory;
        this.IsDisabled = this.arrayOfOptions[this.index].disabled;
        this.initialValues.textColor = this.arrayOfOptions[this.index].textColor;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.ShowTitle = this.arrayOfOptions[this.index].showTitle;
        this.RenderTitle = this.arrayOfOptions[this.index].renderTitle;
        this.RenderError = this.arrayOfOptions[this.index].renderError;
        this.RenderSymbol = this.arrayOfOptions[this.index].renderSymbol;
        this.valueToPrint =
            `value:${this.ValueDate};label:${this.initialValues.label};type:${this.initialValues.type};
            mandatory:${this.IsMandatory};disabled:${this.IsDisabled};textColor:${this.translateHexToRGB(this.initialValues.textColor)};
            xAlignment:${this.initialValues.xAlignment};showTitle:${this.ShowTitle};renderTitle:${this.RenderTitle};
            RenderError:${this.RenderError};renderSymbol:${this.RenderSymbol}`;
    }

    ngOnInit() { }

    openDialog() { }

    changeComponent() {
        if (this.index < this.arrayOfOptions.length - 1) this.index++;
        else {
            alert("date testing ended");
            this.index = 0;
        }
        console.log(`style changed`);
        this.initialValues.label = this.arrayOfOptions[this.index].label;
        this.initialValues.type = this.arrayOfOptions[this.index].type;
        this.IsMandatory = this.arrayOfOptions[this.index].mandatory;
        this.IsDisabled = this.arrayOfOptions[this.index].disabled;
        this.initialValues.textColor = this.arrayOfOptions[this.index].textColor;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.ShowTitle = this.arrayOfOptions[this.index].showTitle;
        this.RenderTitle = this.arrayOfOptions[this.index].renderTitle;
        this.RenderError = this.arrayOfOptions[this.index].renderError;
        this.RenderSymbol = this.arrayOfOptions[this.index].renderSymbol;
        this.valueToPrint =
            `value:${this.ValueDate};label:${this.initialValues.label};type:${this.initialValues.type};
            mandatory:${this.IsMandatory};disabled:${this.IsDisabled};textColor:${this.translateHexToRGB(this.initialValues.textColor)};
            xAlignment:${this.initialValues.xAlignment};showTitle:${this.ShowTitle};renderTitle:${this.RenderTitle};
            RenderError:${this.RenderError};renderSymbol:${this.RenderSymbol}`;
    }

    createAllAttachmentOptionsArray() {
        this.createAttachmentWithAllhorizontalAlignmentOptions();
        for (let index = 0; index < Object.keys(PepDateFieldTypeEnum).length; index++) {
            let dateFieldType = PepDateFieldTypeEnum[Object.keys(PepDateFieldTypeEnum)[index]];
            for (let index1 = 0; index1 < 2; index1++) {
                let isMandatory = index1 ? true : false;
                for (let index3 = 0; index3 < 2; index3++) {
                    let showTitle = index3 ? true : false;
                    for (let index4 = 0; index4 < 2; index4++) {
                        let renderSymbol = index4 ? true : false;
                        let option: dateAllowedOptions = {
                            value: this.ValueDate,
                            label: "date",
                            type: dateFieldType,
                            mandatory: isMandatory,
                            disabled: false,
                            textColor: this.textColors[0],
                            xAlignment: "left",
                            showTitle: showTitle,
                            renderTitle: true,
                            renderError: true,
                            renderSymbol: renderSymbol,
                        };
                        this.arrayOfOptions.push(option);
                    }
                }
            }
        }
    }


    gotoColor() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Color`);
    }

    createAttachmentWithAllhorizontalAlignmentOptions() {
        for (let index = 0; index < Object.keys(PepHorizontalAlignmentEnum).length; index++) {
            let horizontalAlignment = PepHorizontalAlignmentEnum[Object.keys(PepHorizontalAlignmentEnum)[index]];
            let option: dateAllowedOptions = {
                value: this.ValueDate,
                label: "date",
                type: "date",
                mandatory: true,
                disabled: false,
                textColor: this.textColors[0],
                xAlignment: horizontalAlignment,
                showTitle: true,
                renderTitle: true,
                renderError: true,
                renderSymbol: true,
            };
            this.arrayOfOptions.push(option);
        }
        for (let index = 1; index < this.textColors.length; index++) {
            let option: dateAllowedOptions = {
                value: this.ValueDate,
                label: "date",
                type: "date",
                mandatory: true,
                disabled: false,
                textColor: this.textColors[index],
                xAlignment: "left",
                showTitle: true,
                renderTitle: true,
                renderError: true,
                renderSymbol: true,
            };
            this.arrayOfOptions.push(option);
        }
        let option: dateAllowedOptions = {
            value: this.ValueDate,
            label: "date",
            type: "date",
            mandatory: true,
            disabled: true,
            textColor: this.textColors[0],
            xAlignment: "left",
            showTitle: true,
            renderTitle: true,
            renderError: true,
            renderSymbol: true,
        };
        this.arrayOfOptions.push(option);

        option = {
            value: this.ValueDate,
            label: "date",
            type: "date",
            mandatory: true,
            disabled: true,
            textColor: this.textColors[0],
            xAlignment: "left",
            showTitle: true,
            renderTitle: false,
            renderError: true,
            renderSymbol: true,
        };
        this.arrayOfOptions.push(option);
        option = {
            value: this.ValueDate,
            label: "date",
            type: "date",
            mandatory: true,
            disabled: true,
            textColor: this.textColors[0],
            xAlignment: "left",
            showTitle: false,
            renderTitle: false,
            renderError: true,
            renderSymbol: true,
        };
        this.arrayOfOptions.push(option);
    }

    valueChange() {
        console.log("date changed");
    }

    translateHexToRGB(hexValue) {
        let red = parseInt(hexValue[1] + hexValue[2], 16);
        let green = parseInt(hexValue[3] + hexValue[4], 16);
        let blue = parseInt(hexValue[5] + hexValue[6], 16);
        return `rgba(${red},${green},${blue},1)`;
    }

    resetDate() {
        const elem = document.getElementById("forQA");
        debugger;
        elem["Value"] = this.ValueDate;
    }


}

