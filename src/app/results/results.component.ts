import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { QuestionBase } from '../forms/question-base';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-regular-svg-icons';
import { environment } from 'src/environments/environment';

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
  questionIcon = '';
  baseUrl = environment.baseUrl;
  formUrl = `${this.baseUrl}0ae34a35-d281-4867-89c2-1e2d77d747b6`;

  faFrown = faFrown;
  faMeh = faMeh;
  faSmile = faSmile;
  faFrownDefaultColor = '#FF3A6C';
  faMehDefaultColor = '#FFA538';
  faSmileDefaultColor = '#00D390';
  
  textbox = 'textbox';
  textarea = 'textarea';
  radio = 'radio';
  emoji = 'emoji';


  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.formUUID = params.id;
      console.log(`Results fetch id: ${this.formUUID}`);
      this.formUrl = `${this.baseUrl}${params.id}`;
      console.log(`Results fetch url: ${this.formUrl}`);
    });

    this.fetchForm(this.formUrl);
  }

  fetchForm(url: string) {
    this.httpService.fetchForm((result) => {
      this.questions = JSON.parse(JSON.stringify(result.form.questions));
      this.formTitle = JSON.parse(JSON.stringify(result.form.title));
      this.formDate = JSON.parse(JSON.stringify(result.form.date));

      for (const question of this.questions) {
        this.formResults.push(question.results);
      }
    }, url);

  }


}
