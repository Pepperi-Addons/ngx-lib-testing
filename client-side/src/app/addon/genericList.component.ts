import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { PepHorizontalAlignment, PepLayoutService, PepScreenSizeType } from "@pepperi-addons/ngx-lib";
import { IPepGenericListActions, IPepGenericListDataSource, IPepGenericListPager } from '@pepperi-addons/ngx-composite-lib/generic-list';
import { FakeData, FakeSmartFilterFields } from './fakeDataForList';
import { PepBreadCrumbItem, IPepBreadCrumbItemClickEvent } from '@pepperi-addons/ngx-lib/bread-crumbs';


import { TranslateService } from "@ngx-translate/core";

import { AddonService } from "../services/addon.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: "addon-module",
    templateUrl: "./genericList.component.html",
    styleUrls: ["./addon.component.scss"],
})
export class GenericListComponent implements OnInit {

    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    screenSize: PepScreenSizeType;
    breadCrumbsItems = new Array<PepBreadCrumbItem>();
    disableTable = false;
    pager: IPepGenericListPager = {
        type: 'pages',
        size: 10,
        index: 0
    };
    selectionType: any = 'multi';
    supportSorting = false;
    firstFieldAsLink = false;


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

    }

    ngOnInit() {
        this.loadBreadCrumbs();
        this.dataSource = this.getDataSource();
    }

    openDialog() { }

    gotoCheckbox() {
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/~~`);
    }

    dataSource: IPepGenericListDataSource = {
        init: async (params: any) => {
            return {
                dataView: {
                    Type: 'Grid'
                },
                totalCount: -1,
                items: []
            }
        }
    };
    private getRegularReadOnlyColumn(columnId: string): any {
        return {
            FieldID: columnId,
            Type: 'TextBox',
            Title: columnId,
            Mandatory: false,
            ReadOnly: true
        }
    }

    private getLinkColumn(columnId: string): any {
        return {
            FieldID: columnId,
            Type: 'Link',
            Title: columnId,
            Mandatory: false,
            ReadOnly: true
        }
    }

    private getHiddenColumn(columnId: string) {
        return {
            FieldID: columnId,
            Type: 'TextBox',
            Title: columnId,
            Mandatory: false,
            Visible: false
        }
    }
    getDataSource() {
        return {
            init: async (params: any) => {
                const dataList = FakeData.Addons;
                const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                //const filteredData = dataList.slice(0, 5);
                console.log('init params', params);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate
                }));
                const rows2 = filteredData.map((item) => {
                    return {
                        fields: {
                            UUID: item.UUID,
                            Description: item.Addon.Description,
                            Version: item.Version,
                            Type: item.Type,
                            CreationDate: item.CreationDate
                        },
                        isEditable: true,
                        isSelectableForActions: false,
                    }
                });
                return Promise.resolve({
                    dataView: {
                        Context: {
                            Name: '',
                            Profile: { InternalID: 0 },
                            ScreenSize: 'Landscape'
                        },
                        Type: 'Grid',
                        Title: '',
                        Fields: [
                            this.getRegularReadOnlyColumn('UUID'),
                            this.getRegularReadOnlyColumn('Description'),
                            this.getRegularReadOnlyColumn('Version'),
                            this.getLinkColumn('Type'),
                            this.getRegularReadOnlyColumn('CreationDate'),
                            //this.getHiddenColumn('FirstName'),
                        ],
                        Columns: [
                            { Width: 15 },
                            { Width: 30 },
                            { Width: 15 },
                            { Width: 20 },
                            { Width: 20 },
                            // { Width: 0 }
                        ],
                        FrozenColumnsCount: 0,
                        MinimumColumnWidth: 0
                    },
                    totalCount: res.length * 2,
                    items: res

                });
            },
            /*inputs: () => {
                return Promise.resolve(
                    {
                        pager: {
                            type: 'scroll'
                        },
                        selectionType: 'multi'
                    }
                );
            },*/
            update: async (params: any) => {
                console.log('update', params);
                const dataList = FakeData.Addons;
                const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                //const filteredData = dataList.slice(5, 10);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
                return Promise.resolve(res);
            },
            inputs: {
                pager: {
                    type: 'scroll'
                },
                selectionType: 'multi'
            }
        } as IPepGenericListDataSource
    }

    getSmartFilters() {
        return {
            Context: {
                Name: '',
                Profile: { InternalID: 0 },
                ScreenSize: 'Landscape'
            },
            Type: 'Menu',
            Title: '',
            Fields: FakeSmartFilterFields,
            FrozenColumnsCount: 0,
            MinimumColumnWidth: 0
        }
    }

    smartFilter: any = {
        dataView: this.getSmartFilters()
    }

    gotoGenricFrom(){
        this.router.navigateByUrl(`settings/47db1b61-e1a7-42bd-9d55-93dd85044e91/GenericFrom`);
    }

    loadBreadCrumbs() {
        this.breadCrumbsItems.push(new PepBreadCrumbItem({
            key: '1',
            text: 'Crumb1',
            title: 'Title1'
        }));
        this.breadCrumbsItems.push(new PepBreadCrumbItem({
            key: '2',
            text: 'Crumb2',
            title: 'Title2'
        }));

    }

    onBreadCrumbClick(event: IPepBreadCrumbItemClickEvent) {
        console.log('onBreadCrumbClick', event);
        if (event?.source?.text === 'Crumb1') {
            this.pager.type = 'pages';
            this.selectionType = 'multi';
            this.firstFieldAsLink = false;
            this.supportSorting = false;
            this.smartFilter = {
                dataView: this.getSmartFilters()
            }
            this.dataSource = this.getDataSource();


        } else {
            this.pager.type = 'scroll';
            //this.selectionType = 'single';
            //this.firstFieldAsLink = true;
            this.supportSorting = true;
            this.smartFilter = undefined;/*{
                dataView: this.getSmartFilters2()
            } */
            this.dataSource = this.getDataSourceEmpty();

        }
    }

    // menuItems = new Array<PepMenuItem>();


    getDataSourceEmpty() {
        return {
            init: (params: any) => {
                const dataList = FakeData.Addons;
                //const filteredData = dataList.slice(params.fromIndex, params.toIndex + 1);
                const filteredData = dataList.slice(10, 15);
                //  console.log('filteredData 2', filteredData.length);
                const res = filteredData.map(addon => ({
                    UUID: addon.UUID,
                    Description: addon.Addon.Description,
                    Version: addon.Version,
                    Type: addon.Type,
                    CreationDate: addon.CreationDate,
                }));
                return Promise.resolve({
                    dataView: {
                        Context: {
                            Name: '',
                            Profile: { InternalID: 0 },
                            ScreenSize: 'Landscape'
                        },
                        Type: 'Grid',
                        Title: '',
                        Fields: [
                            this.getRegularReadOnlyColumn('UUID'),
                            this.getRegularReadOnlyColumn('Description'),
                            this.getRegularReadOnlyColumn('Version'),
                            this.getRegularReadOnlyColumn('Type'),
                            this.getRegularReadOnlyColumn('CreationDate')
                        ],
                        Columns: [
                            { Width: 15 },
                            { Width: 30 },
                            { Width: 15 },
                            { Width: 20 },
                            { Width: 20 }
                        ],
                        FrozenColumnsCount: 0,
                        MinimumColumnWidth: 0
                    },
                    totalCount: res.length * 2,
                    items: res

                });
            },

        } as IPepGenericListDataSource
    };
}

