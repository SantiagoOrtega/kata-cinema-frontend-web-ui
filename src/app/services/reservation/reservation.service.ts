import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

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

}
