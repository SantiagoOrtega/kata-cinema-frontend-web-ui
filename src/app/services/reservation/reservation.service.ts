import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReservationReq } from '../../models/reservation-req.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly http = inject(HttpClient);

  private timeSource = new BehaviorSubject<string>('');
  timeSelected$ = this.timeSource.asObservable();

  private seatsSource = new BehaviorSubject<string[]>([]);
  seatsSelectedArray$ = this.seatsSource.asObservable();

  private emailSource = new BehaviorSubject<string>('');
  emailProvided$ = this.emailSource.asObservable();

  atSelectTime(time: string) {
    this.timeSource.next(time);
  }

  atSelectSeats(seats: string[]) {
    this.seatsSource.next(seats);
  }

  atProvideEmail(email: string) {
    this.emailSource.next(email);
  }

  public addReservation(reservationBody: ReservationReq) {
    return this.http.post<ReservationReq>(
      environment.cinema.host + '/' + environment.cinema.addReservationPath, reservationBody
    );
  }

}
