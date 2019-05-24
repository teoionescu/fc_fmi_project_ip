import { Component, OnInit } from "@angular/core";

import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset';

import { fromNativeSource } from "tns-core-modules/image-source";
import { ServerService } from "../shared/server.service";
import { QueryInfo } from "../shared/queryinfo.model";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html",
    styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
    public saveToGallery: boolean = false;
    public allowsEditing: boolean = false;
    public keepAspectRatio: boolean = true;
    public width: number = 320;
    public height: number = 240;
    public cameraImage: ImageAsset;
    public actualWidth: number;
    public actualHeight: number;
    public labelText: string;
    public base64: string;

    constructor(private serverService: ServerService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
    
    onGuessLeafTap(args) {
        this.serverService.query(this.base64).then((data: QueryInfo) => {
            console.log(data);
            this.alert("Recognized: " + data.Common_name + " (" + data.ID + ")");
        }).catch(() => {
            this.alert("Unfortunately an error occured.");
        });
    }

    onTakePictureTap(args) {
        requestPermissions().then(
            () => {
                takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing })
                    .then((imageAsset: any) => {
                        this.cameraImage = imageAsset;
                        let that = this;
                        imageAsset.getImageAsync(function (nativeImage, ex) {
                            if (ex instanceof Error) {
                                throw ex;
                            } else if (typeof ex === "string") {
                                throw new Error(ex);
                            }

                            if (imageAsset.android) {
                                that.actualWidth = nativeImage.getWidth();
                                that.actualHeight = nativeImage.getHeight();
                            }

                            const imageSource = fromNativeSource(nativeImage);
                            that.base64 = imageSource.toBase64String("jpg", 60);
                            
                            that.labelText = `Displayed Size: ${that.actualWidth}x${that.actualHeight}`;

                            console.log(`${that.labelText}`);
                        });

                    }, (error) => {
                        console.log("Error: " + error);
                    });
            },
            () => alert('permissions rejected')
        );
    }

    alert(message: string) {
        return alert({
            title: "Frunzulitze",
            okButtonText: "OK",
            message: message
        });
    }
}
