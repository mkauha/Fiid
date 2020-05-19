import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public showFormResultsInput = false;
  public baseUrl = environment.baseUrl;
  public formUrl = `${this.baseUrl}0ae34a35-d281-4867-89c2-1e2d77d747b6`;
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
