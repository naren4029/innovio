import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { VISIT_CACHE_COUNT, VISIT_CACHE_KEY } from "@constants/config";
import { CacheStorageService } from "@services/cacheStorage/cache-storage.service";
import { MovieModel } from "@states/movie/movie.model";

@Injectable({
	providedIn: "root"
})
export class RecentMovieVisitService {

	recentlyVisitedMovies$: BehaviorSubject<MovieModel[]> = new BehaviorSubject<MovieModel[]>([]);

	constructor(private cacheStorage: CacheStorageService) {
		this.updateVisitedMovies();
	}

	addVisitedMovie(visitedMovie: MovieModel): void {
		const recentMovies = [...this.recentlyVisitedMovies$.getValue()];
		const foundIndex = recentMovies.findIndex((movie: MovieModel) => movie.id === visitedMovie.id);

		if (foundIndex !== -1) {
			recentMovies.splice(foundIndex, 1);
		}

		if (VISIT_CACHE_COUNT <= recentMovies.length) {
			recentMovies.pop();
		}
		recentMovies.unshift(visitedMovie);

		if (this.cacheStorage.setLocalStorage(VISIT_CACHE_KEY, recentMovies)) {
			this.updateVisitedMovies();
		}
	}

	private updateVisitedMovies(): void {
		const savedRecentMovies: MovieModel[] | undefined = this.cacheStorage.getLocalStorage(VISIT_CACHE_KEY);

		if (savedRecentMovies) {
			this.recentlyVisitedMovies$.next(savedRecentMovies);
		}
	}

}
