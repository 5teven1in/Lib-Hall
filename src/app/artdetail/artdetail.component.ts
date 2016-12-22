import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpService} from "../http.service";

@Component({
  selector: 'lib-artdetail',
  templateUrl: './artdetail.component.html',
  styleUrls: ['./artdetail.component.sass']
})

export class ArtdetailComponent implements OnInit, OnDestroy {

  private subscriptioni: Subscription;
  private subscription: Subscription;

  id: string;

  constructor(private httpservice: HttpService, private activatedrouter: ActivatedRoute) {
    this.subscriptioni = activatedrouter.params.subscribe(
      (param: any) => this.id = param['id']
    );
  }

  detail: any[] = [];

  ngOnInit() {
    this.subscription = this.httpservice.getDetail(this.id).subscribe(
      (data) => {
        const myarr = [];
        for(let key in data){
          myarr.push(data[key]);
        }
        this.detail = myarr;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptioni.unsubscribe();
    this.subscription.unsubscribe();
  }

  isActive(img: string) {
    return img === this.detail[1].Items[0];
  }

  isShowMore(description: string) {
    if (description.length > 20)
      return true;
    else
      return false;
  }

}
