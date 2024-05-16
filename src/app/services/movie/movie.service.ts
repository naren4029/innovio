import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { MAX_MOVIE_COUNT } from "@constants/config";
import { MovieModel } from "@states/movie/movie.model";

@Injectable({
	providedIn: "root"
})
export class MovieService {

	constructor(private router: Router,
		private store: Store) { }

	getTopPopularMovies(allMovies: MovieModel[]): MovieModel[] {
		const listOfMovies = [...allMovies];
		const sortedMovies = listOfMovies.sort((a, b) => Number(b.popularity) - Number(a.popularity));
		return sortedMovies.slice(0, MAX_MOVIE_COUNT);
	}

	onMovieSelect(movie: MovieModel): void {
		const { slug } = movie;
		if (slug) {
			this.router.navigate([`/movie/${slug}`]);
		}
	}

}
