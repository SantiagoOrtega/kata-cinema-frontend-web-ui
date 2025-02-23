import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { RoomsService } from '../../services/rooms/rooms.service';
import { RoomModel } from '../../models/room-resp.model';

@Component({
  selector: 'app-rooms',
  imports: [],
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomsComponent implements OnInit {
  public movieSelected: string = '';

  private moviesService = inject(MoviesService);
  private roomService = inject(RoomsService);

  public rowTable: RoomModel[] = [];

  public readonly columnTable = [
    { colName: "", control: "id" },
    { colName: "Sala", control: "text" },
    { colName: "Capacidad", control: "text" },
    { colName: "", control: "button" }
  ];

  ngOnInit(): void {
    this.moviesService.movieSelected$.subscribe(movie => this.movieSelected = movie);

    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.rowTable = data;
      },
      error: (err) => {
        console.error('Error obteniendo las películas:', err);
      }
    });
  }
}
