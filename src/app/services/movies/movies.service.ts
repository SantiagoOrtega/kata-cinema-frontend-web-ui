import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetMoviesResp } from '../../models/get-movies-resp.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private movieSource = new BehaviorSubject<string>('');
  movieSelected$ = this.movieSource.asObservable();

  public getMovies() {
    return this.http.get<GetMoviesResp[]>(
      environment.cinema.host + '/' + environment.cinema.getMoviesPath,
    )
  }

  atSelectMovie(movie: string) {
    this.movieSource.next(movie);
  }

}
