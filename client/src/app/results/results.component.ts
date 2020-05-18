import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { QuestionBase } from '../forms/question-base';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  formUUID = '';
  formTitle = ' ';
  formDate = ' ';
  questions: QuestionBase[] = [];
  formResults = [];
  baseUrl = 'http://localhost:3000/forms/';
  formUrl = 'http://localhost:3000/forms/0ae34a35-d281-4867-89c2-1e2d77d747b6';

  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.formUUID = params.id;
      console.log(`Results fetch id: ${this.formUUID}`);
      this.formUrl = `${this.baseUrl}${params.id}`;
      console.log(`Results fetch url: ${this.formUrl}`);

      this.fetchForm(this.formUrl);

    });
  }

  fetchForm(url: string) {
    this.httpService.fetchForm((result) => {
      this.questions = JSON.parse(JSON.stringify(result.form.questions));
      this.formTitle = JSON.parse(JSON.stringify(result.form.title));
      this.formDate = JSON.parse(JSON.stringify(result.form.date));

      for (const question of this.questions) {
        this.formResults.push(question.results);
      }
      console.log(this.formResults);
    }, url);

  }


}
