import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { PepCheckboxFieldType, PepHorizontalAlignment, PepLayoutService, PepScreenSizeType } from "@pepperi-addons/ngx-lib";
import { TranslateService } from "@ngx-translate/core";

import { AddonService } from "../services/addon.service";
import { ActivatedRoute, Router } from "@angular/router";

enum PepHorizontalAlignmentEnum {
    "left" = "left",
    "center" = "center",
    "right" = "right",
}

enum PepCheckboxFieldTypeEnum {
    'checkbox' = 'checkbox',
    'booleanText' = 'booleanText',
}

interface checkboxAllowedOptions {
    value: boolean;
    label: string;
    type: PepCheckboxFieldType;
    mandatory: boolean;
    disabled: boolean;
    xAlignment: PepHorizontalAlignment;
    additionalValue: string;
    showTitle: boolean;
    renderTitle: boolean;
    visible: boolean;
}

@Component({
    selector: "addon-module",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./addon.component.scss"],
})
export class CheckboxComponent implements OnInit {

    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    screenSize: PepScreenSizeType;
    index = 0;
    arrayOfOptions: checkboxAllowedOptions[] = [];
    initialValues: checkboxAllowedOptions = {} as checkboxAllowedOptions;
    IsMandatory = true;
    IsDisabled = false;
    AdditionalValue = "";
    ShowTitle = true;
    RenderTitle = true;
    IsVisible = true;
    TitleToShow = "";
    Value: boolean | undefined = undefined;


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
        this.initialValues.type = this.arrayOfOptions[this.index].type;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.IsMandatory = this.arrayOfOptions[this.index].mandatory;
        this.AdditionalValue = JSON.parse(this.arrayOfOptions[this.index].additionalValue);
        this.ShowTitle = this.arrayOfOptions[this.index].showTitle;
        this.RenderTitle = this.arrayOfOptions[this.index].renderTitle;
        this.IsVisible = this.arrayOfOptions[this.index].visible;
        this.TitleToShow = `value:${this.Value};label:${this.initialValues.label};type:${this.initialValues.type};alignment:${this.initialValues.xAlignment};additionalValue:${this.AdditionalValue};
        showTitle:${this.ShowTitle};renderTitle:${this.RenderTitle};visible:${this.IsVisible};mandatory:${this.IsMandatory};disabled:${this.IsDisabled}`;
    }

    ngOnInit() { }

    openDialog() { }

    changeComponent() {
        if (this.index < this.arrayOfOptions.length - 1) this.index++;
        else {
            alert("checkbox testing ended");
            this.index = 0;
        }
        console.log(`style changed`);
        this.Value = this.arrayOfOptions[this.index].value;
        this.initialValues.label = this.arrayOfOptions[this.index].label;
        this.initialValues.type = this.arrayOfOptions[this.index].type;
        this.IsMandatory = this.arrayOfOptions[this.index].mandatory;
        this.IsDisabled = this.arrayOfOptions[this.index].disabled;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.AdditionalValue = this.arrayOfOptions[this.index].additionalValue;
        this.ShowTitle = this.arrayOfOptions[this.index].showTitle;
        this.RenderTitle = this.arrayOfOptions[this.index].renderTitle;
        this.IsVisible = this.arrayOfOptions[this.index].visible;
        this.TitleToShow = `value:${this.Value};label:${this.initialValues.label};type:${this.initialValues.type};alignment:${this.initialValues.xAlignment};additionalValue:${this.AdditionalValue};
        showTitle:${this.ShowTitle};renderTitle:${this.RenderTitle};visible:${this.IsVisible};mandatory:${this.IsMandatory};disabled:${this.IsDisabled}`;
    }

    createAllAttachmentOptionsArray() {
        this.createAttachmentWithAllhorizontalAlignmentOptions();
        for (let index = 0; index < Object.keys(PepCheckboxFieldTypeEnum).length; index++) {
            let checkBoxFieldType = PepCheckboxFieldTypeEnum[Object.keys(PepCheckboxFieldTypeEnum)[index]];
            for (let index1 = 0; index1 < 2; index1++) {
                const value = index1 % 2 === 0 ? true : false;
                for (let index2 = 0; index2 < 2; index2++) {
                    const mandatory = index2 % 2 === 0 ? true : false;
                    for (let index4 = 0; index4 < 2; index4++) {
                        const showTitle = index4 % 2 === 0 ? true : false;
                        for (let index5 = 0; index5 < 2; index5++) {
                            const renderTitle = index5 % 2 === 0 ? true : false;
                            let option: checkboxAllowedOptions = {
                                value: value,
                                label: "checkbox",
                                type: checkBoxFieldType,
                                mandatory: mandatory,
                                disabled: false,
                                xAlignment: "center",
                                additionalValue: '{"CheckedText": "❤","UncheckedText": "✌️"}',
                                showTitle: showTitle,
                                renderTitle: renderTitle,
                                visible: true,
                            };
                            this.arrayOfOptions.push(option);
                        }
                    }
                }
            }
        }
    }

    gotoAttachment() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Attachment`);
    }

    gotoColor() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Color`);
    }



    createAttachmentWithAllhorizontalAlignmentOptions() {
        for (let index = 0; index < Object.keys(PepHorizontalAlignmentEnum).length; index++) {
            let horizontalAlignment = PepHorizontalAlignmentEnum[Object.keys(PepHorizontalAlignmentEnum)[index]];
            let checkboxFieldType = PepCheckboxFieldTypeEnum[Object.keys(PepCheckboxFieldTypeEnum)[0]];
            let option: checkboxAllowedOptions = {
                value: true,
                label: "checkbox",
                type: checkboxFieldType,
                mandatory: true,
                disabled: false,
                xAlignment: horizontalAlignment,
                additionalValue: '{"CheckedText": "❤","UncheckedText": "✌️"}',
                showTitle: true,
                renderTitle: true,
                visible: true,
            };
            this.arrayOfOptions.push(option);
        }
        let option: checkboxAllowedOptions = {
            value: true,
            label: "checkbox",
            type: "checkbox",
            mandatory: true,
            disabled: true,
            xAlignment: "center",
            additionalValue: '{"CheckedText": "❤","UncheckedText": "✌️"}',
            showTitle: true,
            renderTitle: true,
            visible: true,
        };
        this.arrayOfOptions.push(option);
        option = {
            value: true,
            label: "checkbox",
            type: "checkbox",
            mandatory: true,
            disabled: false,
            xAlignment: "center",
            additionalValue: '{"CheckedText": "❤","UncheckedText": "✌️"}',
            showTitle: true,
            renderTitle: true,
            visible: false,
        };
    }

    fileChanged() {
        console.log("file changed");
    }

    elemClicked() {
        console.log("checkbox value changed");
    }

}

