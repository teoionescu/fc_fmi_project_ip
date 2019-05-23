import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TabsComponent } from "./tabs.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {
                path: "default", component: TabsComponent, children: [
                    {
                        path: "home",
                        outlet: "homeTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/home/home.module#HomeModule"
                    },
                    {
                        path: "browse",
                        outlet: "browseTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/browse/browse.module#BrowseModule"
                    },
                    {
                        path: "search",
                        outlet: "searchTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/search/search.module#SearchModule"
                    },
                    {
                        path: "history",
                        outlet: "historyTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "~/app/history/history.module#HistoryModule"
                    }
                ]
            }
        ])
    ],
    declarations: [
        TabsComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }