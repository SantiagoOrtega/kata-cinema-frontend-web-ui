import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { RoomsService } from '../../services/rooms/rooms.service';
import { RoomModel } from '../../models/room-resp.model';
import { RoomsTableRow } from '../../models/rooms-table.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomsComponent implements OnInit {
  public movieSelected: string = '';
  public showSchedulesByRoom: boolean = false;
  public roomSelected: string = '';
  public showSeats: boolean = false;

  public totalSeats = 50;
  seatArray: number[] = Array.from({ length: this.totalSeats }, (_, i) => i + 1);

  private moviesService = inject(MoviesService);
  private roomService = inject(RoomsService);

  public rowTable: RoomsTableRow[] = [];

  public readonly columnTable = [
    { colName: "Sala", control: "text" },
    { colName: "Capacidad", control: "text" },
    { colName: "", control: "button" }
  ];

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        console.log(data);
        
        this.rowTable = data.map((room) => ({
          Simple0: room.room,
          Simple1: room.capacity,
          Button1: 'Seleccionar ›',
        }));
      },
      error: (err) => {
        console.error('Error obteniendo las películas:', err);
      }
    });
  }

  public showSchedules(event: CustomEvent) {
    this.roomSelected = event.detail.data.Simple0;
    this.showSchedulesByRoom = true;
  }

  public onScheduleClick() {
    console.log("click");
    this.showSeats = true;
  }
}
