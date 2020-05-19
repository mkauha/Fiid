import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { QuestionControlService } from '../services/question-control.service';
import { QuestionBase } from '../forms/question-base';
import { HttpService } from '../services/http.service';
import { GeneratedForm } from './generated-form';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  formResults: string[] = [];
  baseApiUrl = environment.baseApiUrl;
  baseClientUrl = environment.baseClientUrl;
  formUrl = `${this.baseApiUrl}0ae34a35-d281-4867-89c2-1e2d77d747b6`;
  findForminput = '';

  public showUrlInput = false;
  public formState = FormState.Open;

  constructor(private qcs: QuestionControlService,
              private httpService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.formUUID = params.id;
      this.formUrl = `${this.baseApiUrl}${params.id}`;

      this.fetchForm(this.formUrl);

    });
  }

  onSubmit() {
    let i = 0;
    this.formResults = this.formGroup.value;
    // tslint:disable-next-line: forin
    for (const key in this.formResults) {
      const value = this.formResults[key];
      this.questions[i].results.push(value);
      i++;
    }

    this.qcs.saveForm(new GeneratedForm(this.formTitle, this.formDate, this.questions, this.formResults));
    this.httpService.postGeneratedForm(this.formUUID, this.qcs.getForm());
    this.formState = FormState.Submitted;
  }

  fetchForm(url: string) {
    this.httpService.fetchForm((result) => {
      if (result === null) {
        this.formState = FormState.NotFound;
      }
      this.questions = JSON.parse(JSON.stringify(result.form.questions));
      this.formTitle = JSON.parse(JSON.stringify(result.form.title));
      this.formDate = JSON.parse(JSON.stringify(result.form.date));
      this.qcs.saveForm(new GeneratedForm(this.formTitle, this.formDate, this.questions, this.formResults));
      this.formGroup = this.qcs.getFormGroup();
    }, url);

  }

  onFindForm() {
    if (this.findForminput.includes(this.baseClientUrl)) {
      const urlArr = this.findForminput.split('/');
      const paramArr = urlArr[3].split('=');
      this.findForminput = paramArr[1];
    }
    this.router.navigate(['/form'], { queryParams: { id: this.findForminput } });
  }

}

enum FormState {
  Open = 0,
  Submitted = 1,
  NotFound = 2,
}
