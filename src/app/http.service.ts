import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneratedForm } from './forms/generated-form';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private postUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  fetchForm(callBackFunction: (result: any) => void, fetchUrl: string): void {
    this.http.get<any>(fetchUrl).subscribe(jsonObject => {
      callBackFunction(jsonObject);
    });
  }

  postGeneratedForm(UUID: string, generatedForm: GeneratedForm) {
    const postedForm = {id: UUID, form: generatedForm};
    this.http.post<GeneratedForm>(this.postUrl, postedForm, {observe: 'response'}).subscribe(response => {
    });
  }

  deleteGeneratedForm(UUID: string) {
    this.http.delete(this.postUrl + UUID).subscribe(response => {
    });
  }
}
