import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { PepHorizontalAlignment, PepLayoutService, PepScreenSizeType } from "@pepperi-addons/ngx-lib";
import { TranslateService } from "@ngx-translate/core";

import { AddonService } from "../services/addon.service";
import { ActivatedRoute, Router } from "@angular/router";

enum PepHorizontalAlignmentEnum {
    "left" = "left",
    "center" = "center",
    "right" = "right",
}

interface attachmenAllowedOptions {
    value: string;
    label: string;
    isMandatory: boolean;
    xAlignment: PepHorizontalAlignment;
    disabled: boolean;
    showTitle: boolean;
    src: string;
    rowSpan: number;
}

@Component({
    selector: "addon-module",
    templateUrl: "./attachment.component.html",
    styleUrls: ["./addon.component.scss"],
})
export class AttachmentComponent implements OnInit {

    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    screenSize: PepScreenSizeType;
    index = 0;
    arrayOfOptions: attachmenAllowedOptions[] = [];
    initialValues: attachmenAllowedOptions = {} as attachmenAllowedOptions;
    RowSpan = 0;
    ShowLabel = true;
    IsMandatory = true;
    Src = "";


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
        this.IsMandatory = this.arrayOfOptions[this.index].isMandatory;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.ShowLabel = this.arrayOfOptions[this.index].showTitle;
        this.RowSpan = this.arrayOfOptions[this.index].rowSpan;
        this.initialValues.src = this.arrayOfOptions[this.index].src;
    }

    ngOnInit() { }

    openDialog() { }

    changeComponent() {
        if (this.index < this.arrayOfOptions.length - 1) this.index++;
        else {
            alert("attachment testing ended");
            this.index = 0;
        }

        console.log(`style changed`);
        this.IsMandatory = this.arrayOfOptions[this.index].isMandatory;
        this.initialValues.xAlignment = this.arrayOfOptions[this.index].xAlignment;
        this.initialValues.value = this.arrayOfOptions[this.index].value;
        this.ShowLabel = this.arrayOfOptions[this.index].showTitle;
        this.RowSpan = this.arrayOfOptions[this.index].rowSpan;
        this.initialValues.label = this.arrayOfOptions[this.index].label;
    }

    createAllAttachmentOptionsArray() {
        this.createAttachmentWithAllhorizontalAlignmentOptions();
        for (let index = 1; index < 9; index++) {
            let rowSpan = index;
            for (let index1 = 0; index1 < 2; index1++) {
                let isMandatory = index1 ? true : false;
                for (let index2 = 0; index2 < 2; index2++) {
                    let showTitle = index2 ? true : false;
                    let option: attachmenAllowedOptions = {
                        label: "att label",
                        isMandatory: isMandatory,
                        xAlignment: "left",
                        disabled: false,
                        showTitle: showTitle,
                        src: "https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/logo.svg",
                        rowSpan: rowSpan,
                        value: `mandatory:${isMandatory};xAlignment:left;showTitle:${showTitle};rowSpan:${rowSpan}->` + this.setSize(rowSpan)
                    };
                    this.arrayOfOptions.push(option);
                }
            }
        }

    }

    gotoButtons() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Buttons`);
    }


    gotoCheckbox() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/Checkbox`);
    }

    createAttachmentWithAllhorizontalAlignmentOptions() {
        for (let index = 0; index < Object.keys(PepHorizontalAlignmentEnum).length; index++) {
            let horizontalAlignment = PepHorizontalAlignmentEnum[Object.keys(PepHorizontalAlignmentEnum)[index]];
            let option: attachmenAllowedOptions = {
                label: "att label",
                isMandatory: true,
                xAlignment: horizontalAlignment,
                disabled: false,
                showTitle: true,
                src: "https://idpfiles.sandbox.pepperi.com/f389fd2e-4a31-4965-a21e-3a98b4553300/images/logo.svg",
                rowSpan: 1,
                value: `mandatory:true;xAlignment:${horizontalAlignment};showTitle:true;rowSpan:1->` + this.setSize(1),
            };
            this.arrayOfOptions.push(option);
        }
    }

    fileChanged() {
        console.log("file changed");
    }

    elemClicked() {
        console.log("element clicked");
    }

    setSize(rowSpan: number): string {
        switch (rowSpan) {
            case 1:
                return "42x1568";
            case 2:
                return "106x1568";
            case 3:
                return "170x1568";
            case 4:
                return "234x1568";
            case 5:
                return "298x1568";
            case 6:
                return "362x1568";
            case 7:
                return "426x1568";
            case 8:
                return "490x1568";
        }

    }

}

