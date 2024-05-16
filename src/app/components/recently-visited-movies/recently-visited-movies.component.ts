import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MovieModel } from "@states/movie/movie.model";
import { MatChipsModule } from "@angular/material/chips";

@Component({
	selector: "app-recently-visited-movies",
	standalone: true,
	imports: [MatChipsModule],
	templateUrl: "./recently-visited-movies.component.html",
	styleUrl: "./recently-visited-movies.component.scss"
})
export class RecentlyVisitedMoviesComponent {

  @Input() labels!: { lastVisitedLabel: string };
  @Input() recentMovies!: MovieModel[];

  @Output() readonly selectedMovie = new EventEmitter<MovieModel>();

  selectMovie(movie: MovieModel): void { this.selectedMovie.emit(movie);  }

}
