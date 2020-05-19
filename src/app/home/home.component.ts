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
  public baseApiUrl = environment.baseApiUrl;
  public baseClientUrl = environment.baseClientUrl;
  public formUrl = `${this.baseApiUrl}0ae34a35-d281-4867-89c2-1e2d77d747b6`;
  public formResultsUUID = '';
  public formUUID = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onGoToResults() {
    if (this.formResultsUUID.includes(this.baseClientUrl)) {
      const urlArr = this.formResultsUUID.split('/');
      const paramArr = urlArr[3].split('=');
      this.formResultsUUID = paramArr[1];
    }
    this.router.navigate(['/results'], { queryParams: { id: this.formResultsUUID } });
  }

  onGoToForm() {
    if (this.formUUID.includes(this.baseClientUrl)) {
      const urlArr = this.formUUID.split('/');
      const paramArr = urlArr[3].split('=');
      this.formUUID = paramArr[1];
    }
    this.router.navigate(['/form'], { queryParams: { id: this.formUUID } });
  }

}
