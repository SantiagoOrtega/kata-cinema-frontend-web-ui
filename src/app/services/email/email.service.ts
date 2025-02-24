import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EmailRequest } from '../../models/email-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);

  sendEmail(emailBody: EmailRequest) {
    return this.http.post<any>(
      environment.cinema.host + '/' + environment.cinema.sendEmailPath, 
      emailBody
    );
  }
}
