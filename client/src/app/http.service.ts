import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GeneratedForm } from './forms/generated-form';
import { Form } from './forms/form';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private postUrl = 'http://localhost:3000/forms/';

  constructor(private http: HttpClient) { }

  fetchForm(callBackFunction: (result: any) => void, fetchUrl: string): void {
    this.http.get<any>(fetchUrl).subscribe(jsonObject => {
      console.log(jsonObject);
      callBackFunction(jsonObject);
    });
  }

  postForm(form: object) {
    console.log(form);
/*     this.http.post<any>(this.postUrl, form).subscribe(data => {
      console.log(data);
    }); */
  }

  postGeneratedForm(generatedForm: GeneratedForm) {
    let postedForm = {id: 1, form: generatedForm};
    this.http.post<GeneratedForm>(this.postUrl, postedForm, {observe: 'response'}).subscribe(response => {
      console.log(response);
    });
  }
}

interface GeneratedFormResponse {
  results: Form;
}
