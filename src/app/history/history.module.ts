import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HistoryRoutingModule } from "./history-routing.module";
import { HistoryComponent } from "./history.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HistoryRoutingModule,
        NativeScriptUIListViewModule,
    ],
    declarations: [
        HistoryComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HistoryModule { }
