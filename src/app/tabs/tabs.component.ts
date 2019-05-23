import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { isAndroid } from "tns-core-modules/platform";

@Component({
    moduleId: module.id,
    selector: "tabs-page",
    templateUrl: "./tabs.component.html"
})
export class TabsComponent implements OnInit {
    constructor(
        private routerExtension: RouterExtensions,
        private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.routerExtension.navigate([{ outlets: { homeTab: ["home"], browseTab: ["browse"], searchTab: ["search"] } }], { relativeTo: this.activeRoute });
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";
        return iconPrefix + icon;
    }
}