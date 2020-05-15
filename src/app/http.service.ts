import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private fetchUrl = 'https://swapi.co/api/planets/';
  private postUrl = 'https://my-json-server.typicode.com/mkauha/JSON-server-demo/blogposts';
  
  constructor(private http: HttpClient) { }

  fetchForm(callBackFunction: (result: Object[]) => void): void {
    this.http.get(this.fetchUrl).subscribe(jsonObject => {
      console.log(jsonObject);
    });
  }

  postForm(form: object) {
    this.http.post<any>(this.postUrl, form).subscribe(data => {
      console.log(data);
    });
  }
}
