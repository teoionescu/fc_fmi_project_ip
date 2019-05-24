import { Injectable } from "@angular/core";
import { QueryInfo, AllClassesInfo, HistoryData } from "./queryinfo.model";
import { ServerService } from "./server.service";
import { ImageSource, fromBase64 } from "tns-core-modules/image-source/image-source";

export interface IDataItem {
    id: number;
    data: QueryInfo;
    image?: ImageSource;
}

@Injectable()
export class DataService {

    private items = new Array<IDataItem>();

    constructor(private serverService: ServerService) {
        this.serverService.getAllClassesInfo().then((data: AllClassesInfo) => {
            data.Data.forEach((element, idx) => {
                this.items.push({
                    id: Number(element.ID),
                    data: element
                });
            });
        }).catch(() => {
            console.log("Error occured in Dataservice request");
        });
    }

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }

    getHistory(): Promise<Array<IDataItem>> {
        return new Promise((resolve, reject) => {
            let dhist = new Array<IDataItem>();
            this.serverService.getHistory().then((data: HistoryData) => {
                data.Data.forEach((element, idx) => {
                    let el: IDataItem = {
                        id: idx,
                        data: element.Answer
                    };
                    dhist.push(el);
                    let imageSource = new ImageSource();
                    imageSource.fromBase64(element.Photo).then(() => {
                        el.image = imageSource;
                    });
                });
                dhist = dhist.reverse();
                resolve(dhist);
            }).catch(() => {
                console.log("Error occured in Dataservice request");
                reject();
            });
        });        
    }
}
