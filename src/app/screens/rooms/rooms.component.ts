import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChildren } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { RoomsService } from '../../services/rooms/rooms.service';
import { RoomModel } from '../../models/room-resp.model';
import { RoomsTableRow } from '../../models/rooms-table.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation/reservation.service';

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
  public showConfirm: boolean = false;
  public seatsCount: number = 0;
  public submitValid: boolean = false;

  public totalSeats: number = 0;
  seatArray: number[] = [];
  seatsSelectedArray: string[] = [];

  private moviesService = inject(MoviesService);
  private roomService = inject(RoomsService);
  private reservationService = inject(ReservationService);
  private router = inject(Router);

  public rowTable: RoomsTableRow[] = [];

  public readonly columnTable = [
    { colName: "Sala", control: "text" },
    { colName: "Capacidad", control: "text" },
    { colName: "", control: "button" }
  ];

  ngOnInit(): void {
    this.moviesService.movieSelected$.subscribe((movie) => this.movieSelected = movie);
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
    this.totalSeats = event.detail.data.Simple1;
    this.seatArray = Array.from({ length: this.totalSeats }, (_, i) => i + 1);
    this.showSeats = false;
    this.showConfirm = false;
    this.showSchedulesByRoom = true;
    this.seatsCount = 0;
    this.seatsSelectedArray = [];
    console.log("sillas reset", this.seatsCount);
    this.roomService.atSelectRoom(event.detail.data.Simple0);
  }

  public onScheduleClick(event: CustomEvent) {
    console.log("click", event);
    this.showSeats = true;
    const checkedTime = event.detail.find((item: any) => item.isChecked === 'true');    
    this.reservationService.atSelectTime(checkedTime.label);
  }

  public onSeatClick(event: CustomEvent) {
    console.log("click seat", event);
    if (event.detail.state) {
      this.seatsCount++;
      this.seatsSelectedArray.push(event.detail.text);
    } else {
      this.seatsCount--;
      this.seatsSelectedArray.pop();
    }
    this.reservationService.atSelectSeats(this.seatsSelectedArray);
    this.showEmailAndConfirm();
    console.log("sillas", this.seatsCount, this.seatsSelectedArray);
  }

  private showEmailAndConfirm() {
    if (this.seatsCount > 0) {
      this.showConfirm = true;
    } else {
      this.showConfirm = false;
    }
  }

  validateEmail(event: CustomEventInit) {
    if (event.detail.valid) {
      this.submitValid = true;
    } else {
      this.submitValid = false;
    }
    this.reservationService.atProvideEmail(event.detail.value);
  }

  onConfirmClick() {
    this.router.navigate(['/summary']);
  }
}
