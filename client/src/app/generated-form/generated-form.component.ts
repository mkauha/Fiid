import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { QuestionBase } from '../forms/question-base';
import { HttpService } from '../http.service';
import { GeneratedForm } from '../forms/generated-form';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generated-form',
  templateUrl: './generated-form.component.html',
  styleUrls: ['./generated-form.component.css']
})

export class GeneratedFormComponent implements OnInit {
  formGroup: FormGroup;
  questions: QuestionBase[] = [];
  formUUID = '';
  formTitle = ' ';
  formDate = ' ';
  baseUrl = 'http://localhost:3000/forms/';
  formUrl = 'http://localhost:3000/forms/0ae34a35-d281-4867-89c2-1e2d77d747b6';

  public showUrlInput = false;

  constructor(private qcs: QuestionControlService,
              private httpService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.formUrl = `${this.baseUrl}${params.id}`;
      console.log(this.formUrl);

      this.fetchForm(this.formUrl);

    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    console.log(this.questions);
    // this.httpService.postForm(this.form.value);
  }

  fetchForm(url: string) {
    this.httpService.fetchForm((result) => {
      if (result === null) {
        this.showUrlInput = true;
      }
      this.questions = JSON.parse(JSON.stringify(result.form.questions));
      this.formTitle = JSON.parse(JSON.stringify(result.form.title));
      this.formDate = JSON.parse(JSON.stringify(result.form.date));
      this.qcs.saveForm(new GeneratedForm(this.formTitle, new Date(this.formDate), this.questions));
      this.formGroup = this.qcs.getFormGroup();
    }, url);

  }

  onFindForm() {

    const urlArr = this.formUrl.split('/');
    console.log(urlArr)
    const paramArr = urlArr[3].split('=');
    console.log(paramArr)
    this.formUUID = paramArr[1];
    this.formUrl = `${this.baseUrl}${this.formUUID}`;
    this.router.navigate(['/form'], { queryParams: { id: this.formUUID } });
    this.showUrlInput = false;
  }

}
