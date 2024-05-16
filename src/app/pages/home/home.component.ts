import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngxs/store";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

import { HOME_PAGE_LABELS, MOVIE_LIST_LABELS } from "@constants/labels";
import { MovieModel } from "@states/movie/movie.model";
import { MovieService } from "@services/movie/movie.service";
import { MovieListComponent } from "@components/movie-list/movie-list.component";
import { PAGINATOR_DEFAULT_SIZE } from "@constants/config";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [MatIconModule, MatPaginatorModule, MovieListComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss"
})

export class HomeComponent implements OnDestroy{

	labels = HOME_PAGE_LABELS;
	movieLabels = MOVIE_LIST_LABELS;
	listOfTopMovies: MovieModel[] = [];
	pageIndex = 0;
	startIndex = 0;
	endIndex = 10;
	showFirstLastButtons = true;
	pageSize = PAGINATOR_DEFAULT_SIZE;
	private subscription$ = new Subscription();

	constructor(
		private store: Store,
		private movieService: MovieService
	) {
		this.subscriptions();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	onMovieSelect(movie: MovieModel): void {
		return this.movieService.onMovieSelect(movie);
	}

	subscriptions(): void {
		this.store.select(state => state.moviesList.movies)
			.subscribe(data => this.listOfTopMovies = this.movieService.getTopPopularMovies(data));
	}

	handlePageEvent(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.startIndex = event.pageIndex * event.pageSize;
		this.endIndex = this.startIndex + event.pageSize;
		this.pageIndex = event.pageIndex;
	}

}
