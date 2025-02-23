import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RoomModel } from '../../models/room-resp.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private readonly http = inject(HttpClient);
  private roomSource = new BehaviorSubject<string>('');
  roomSelected$ = this.roomSource.asObservable();
  
  public getRooms() {
    return this.http.get<RoomModel[]>(
      environment.cinema.host + '/' + environment.cinema.getRoomsPath,
    )
  }

  atSelectRoom(room: string) {
    this.roomSource.next(room);
  }

}
