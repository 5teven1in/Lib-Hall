import {Component, OnInit, DoCheck, OnDestroy, OnChanges} from '@angular/core';
import {HttpService} from "../http.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.sass']
})

export class ArtComponent implements OnInit, DoCheck, OnDestroy {

  private subscriptiony: Subscription;
  private subscription: Subscription;

  constructor(private httpservice: HttpService, private activatedrouter: ActivatedRoute) { }

  autoload: boolean;
  curyear: string;
  page = '1';
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
    this.subscription = this.httpservice.getData(this.page, this.year).subscribe(
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
    console.log(this.year);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptiony.unsubscribe();
  }

}
