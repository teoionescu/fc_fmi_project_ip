import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HistoryComponent } from "./history.component";

const routes: Routes = [
    { path: "", redirectTo: "history" },
    { path: "history", component: HistoryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HistoryRoutingModule { }
