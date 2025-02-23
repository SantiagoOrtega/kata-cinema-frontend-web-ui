import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RoomModel } from '../../models/room-resp.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private readonly http = inject(HttpClient);
  
  public getRooms() {
    return this.http.get<RoomModel[]>(
      environment.cinema.host + '/' + environment.cinema.getRoomsPath,
    )
  }

}
