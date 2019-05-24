import { Component, OnInit } from '@angular/core';
import { IDataItem, DataService } from '../shared/data.service';
import { ListViewEventData } from 'nativescript-ui-listview';
import { ImageSource } from 'tns-core-modules/image-source/image-source';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'History',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  moduleId: module.id,
})
export class HistoryComponent implements OnInit {
  items: Array<IDataItem>;

  constructor(private _itemService: DataService, private routerExtension: RouterExtensions) { }

  ngOnInit(): void {
    this._itemService.getHistory().then((list: IDataItem[]) => {
      this.items = list;
    });
    
  }

  /* goTo(args): void {
    this.routerExtension.navigate(["/tabs/default"]);
  } */

  onPullToRefreshInitiated(args: ListViewEventData) {
    console.log("rfrsh");
    this._itemService.getHistory().then((list: IDataItem[]) => {
      this.items = list;
      setTimeout(function () {
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
      }, 500);
    });
    
  }
}
