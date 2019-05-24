import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        BrowseRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        BrowseComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule { }
