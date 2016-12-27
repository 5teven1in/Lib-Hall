import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getData(page: string, year: string) {
    return this.http.get('http://140.113.66.249:65534/getinfo/' + page + '/' + year)
      .map((response: Response) => response.json());
  }

  getPage(page: string) {
    return this.http.get('http://140.113.66.249:65534/getinfo/' + page)
      .map((response: Response) => response.json());
  }

  getDetail(serial: string) {
    return this.http.get('http://140.113.66.249:65534/getdetail/' + serial)
      .map((response: Response) => response.json());
  }
}
