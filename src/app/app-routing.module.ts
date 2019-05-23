import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from './login/login.component';
import { AppComponent } from "./app.component";

const routes: Routes = [
    /*{
        path: "",
        redirectTo: "/(homeTab:home/default//browseTab:browse/default//searchTab:search/default//historyTab:history/default)",
        pathMatch: "full"
    },

    {
        path: "home",
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/home/home.module#HomeModule",
        outlet: "homeTab"
    },
    {
        path: "browse",
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/browse/browse.module#BrowseModule",
        outlet: "browseTab"
    },
    {
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/search/search.module#SearchModule",
        outlet: "searchTab"
    },
    {
        path: "history",
        component: NSEmptyOutletComponent,
        loadChildren: "~/app/history/history.module#HistoryModule",
        outlet: "historyTab"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
