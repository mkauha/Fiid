import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public showFormResultsInput = false;
  public formUrl = '';
  public formUUID = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onGoToResults() {
    this.router.navigate(['/results'], { queryParams: { id: this.formUUID } });
  }

  onGoToForm() {
    this.router.navigate(['/form'], { queryParams: { id: this.formUUID } });
  }

}
