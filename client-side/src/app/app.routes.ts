import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddonComponentButtons } from "./addon/buttons.component";
import { AttachmentComponent } from "./addon/attachment.component";

// Important for single spa
@Component({
  selector: "app-empty-route",
  template: "<div></div>",
})
export class EmptyRouteComponent {}

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
export class AppRoutingModule {}
