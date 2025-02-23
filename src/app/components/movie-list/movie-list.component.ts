import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { GetMoviesResp } from '../../models/get-movies-resp.model';
import { MovieTableRow } from '../../models/movies-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [],
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieListComponent implements OnInit{

  public readonly columnTable = [
    { colName: "", control: "id" },
    { colName: "Título", control: "text" },
    { colName: "Género", control: "text" },
    { colName: "Duración", control: "text" },
    { colName: "Clasificación", control: "text" },
    { colName: "", control: "button" }
  ];

  // public readonly rowTable = [
  //   { id: "0", Simple0: "Content Text Fill", Simple1: "Content Text Fill", Simple2: "Content Text Fill", Simple3: "Content Text Fill", Boton4: "Ver más ›" },
  //   { id: "1", Simple0: "Content Text Fill", Simple1: "Content Text Fill", Simple2: "Content Text Fill", Simple3: "Content Text Fill", Boton4: "Ver más ›" },
  //   { id: "2", Simple0: "Content Text Fill", Simple1: "Content Text Fill", Simple2: "Content Text Fill", Simple3: "Content Text Fill", Boton4: "Ver más ›" },
  //   { id: "3", Simple0: "Content Text Fill", Simple1: "Content Text Fill", Simple2: "Content Text Fill", Simple3: "Content Text Fill", Boton4: "Ver más ›" },
  //   { id: "4", Simple0: "Content Text Fill", Simple1: "Content Text Fill", Simple2: "Content Text Fill", Simple3: "Content Text Fill", Boton4: "Ver más ›" }
  // ];

  public rowTable: MovieTableRow[] = [];

  private moviesService = inject(MoviesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        console.log(data);
        
        this.rowTable = data.map((movie) => ({
          id: movie.id,
          Simple0: movie.title,
          Simple1: movie.genre,
          Simple2: movie.running_Time,
          Simple3: movie.qualification,
          Boton4: 'Reserva aquí ›',
        }));
      },
      error: (err) => {
        console.error('Error obteniendo las películas:', err);
      }
    });
  }

  public redirectToRooms(event: CustomEvent) {
    console.log('CLICK RESERVA AQUI', event);
    this.moviesService.atSelectMovie(event.detail.data.Simple0);
    this.router.navigate(['/rooms']);
  }

}
