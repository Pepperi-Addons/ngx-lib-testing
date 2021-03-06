import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddonComponentButtons } from "./addon/buttons.component";
import { AttachmentComponent } from "./addon/attachment.component";
import { CheckboxComponent } from "./addon/checkbox.component";
import { DateComponent } from "./addon/date.component";
import { ColorComponent, TextBoxComponent } from "./addon";
import { GenericListComponent } from "./addon/genericList.component";
import { GenericFormExampleComponent } from "./addon/genericForm.component";



// Important for single spa
@Component({
  selector: "app-empty-route",
  template: "<div></div>",
})
export class EmptyRouteComponent { }

const routes: Routes = [
  {
    path: `settings/:addon_uuid`,
    children: [
      {
        path: "Buttons",
        component: AddonComponentButtons,
      },
      {
        path: "Attachment",
        component: AttachmentComponent,
      },
      {
        path: "Checkbox",
        component: CheckboxComponent,
      },
      {
        path: "Color",
        component: ColorComponent,
      },
      {
        path: "Date",
        component: DateComponent,
      },
      {
        path: "GenericList",
        component: GenericListComponent,
      },
      {
        path: "GenericFrom",
        component: GenericFormExampleComponent,
      },
      {
        path: "TextBox",
        component: TextBoxComponent,
      },
    ],
  },
  {
    path: "**",
    component: EmptyRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
