import {Component, OnInit, DoCheck, OnDestroy, OnChanges} from '@angular/core';
import {HttpService} from "../http.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'lib-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.sass']
})

export class ArtComponent implements OnInit, DoCheck, OnDestroy {

  private subscriptiony: Subscription;
  private subscriptionp: Subscription;
  private subscription: Subscription;

  constructor(private httpservice: HttpService, private activatedrouter: ActivatedRoute) { }

  autoload: boolean;
  curyear: string;
  page = 1;
  year: string;
  items: any[] = [];

  init() {
    this.subscriptiony = this.activatedrouter.params.subscribe(
      (param: any) => this.year = param['year']
    );
    if (typeof this.year == 'undefined') {
      this.year = new Date().getFullYear().toString();
      this.autoload = true;
    }
    else this.autoload = false;
  }

  change() {
    this.subscription = this.httpservice.getData(this.page.toString(), this.year).subscribe(
      (data) => {
        const myarr = [];
        for(let key in data){
          myarr.push(data[key]);
        }
        this.items = myarr;
      }
    );
  }

  ngOnInit() {
    this.init();
    this.change();
    this.curyear = this.year;
  }

  ngDoCheck() {
    this.init();
    if (this.year != this.curyear) {
      this.change();
      this.curyear = this.year;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptiony.unsubscribe();
    if (this.autoload)
      this.subscriptionp.unsubscribe();
  }

  loadPage() {
    this.subscriptionp = this.httpservice.getPage(this.page.toString()).subscribe(
      (data) => {
        const myarr = [];
        for(let key in data){
          myarr.push(data[key]);
        }
        this.tmp = myarr;
      }
    );
  }

  throttle = 300;
  scrollDistance = 1;
  tmp: any[] = [];
  onScrollDown() {
    if (this.autoload) {
      this.page = this.page + 1;
      this.loadPage();
      if (this.tmp[0] == 200)
        for(let key in this.tmp[1]){
          this.items[1].push(this.tmp[1][key]);
        }
    }
  }

}
