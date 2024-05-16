import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { type MatSelectChange, MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, MatPaginator ,PageEvent } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";

import { Subject, Subscription, debounceTime } from "rxjs";
import { Store } from "@ngxs/store";

import { MOVIES_PAGE_LABELS, MOVIE_LIST_LABELS } from "@constants/labels";
import { DELAY_INTERVAL, PAGINATOR_DEFAULT_SIZE } from "@constants/config";

import { MovieModel } from "@states/movie/movie.model";
import { MovieService } from "@services/movie/movie.service";
import { MovieListComponent } from "@components/movie-list/movie-list.component";

@Component({
	selector: "app-movies",
	standalone: true,
	imports: [
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatPaginatorModule,
		MatPaginator,
		MatFormFieldModule,
		MovieListComponent,
		MatInputModule,
		MatSelectModule
	],
	templateUrl: "./movies.component.html",
	styleUrl: "./movies.component.scss"
})

export class MoviesComponent implements OnInit, OnDestroy {

	labels = MOVIES_PAGE_LABELS;
	movieLabels = MOVIE_LIST_LABELS;
	listOfMovies: MovieModel[] = [];
	filteredMovies: MovieModel[] = [];
	pageIndex = 0;
	startIndex = 0;
	endIndex = 10;
	showFirstLastButtons = true;
	pageSize = PAGINATOR_DEFAULT_SIZE;
	searchTerm: string | undefined;
	genreOptions: (string | undefined)[] = [];
	selectedGenres: string[] = [];
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	private subscriptions$ = new Subscription();
	private searchKeywordUpdated$ = new Subject<string>();

	constructor(
		private store: Store,
		private movieService: MovieService,
		private router: Router,
		private route: ActivatedRoute
	) {	}

	ngOnInit(): void {
		this.stateUpdated();
		this.queryParamUpdated();
		this.searchFilterUpdated();
	}

	ngOnDestroy(): void {
		this.subscriptions$.unsubscribe();
	}

	onMovieSelect(movie: MovieModel): void {
		return this.movieService.onMovieSelect(movie);
	}

	handlePageEvent(event: PageEvent): void {
		console.log(event);
		this.pageSize = event.pageSize;
		this.startIndex = event.pageIndex * event.pageSize;
		this.endIndex = this.startIndex + event.pageSize;
		this.pageIndex = event.pageIndex;
	}

	stateUpdated(): void {
		this.subscriptions$.add(
			this.store.select(state => state.moviesList.movies).subscribe(data => {
				this.listOfMovies = data;
				this.genreOptions = this.getGenreOptions(this.searchTerm);
				this.applyFiltersOnMovies();
			})
		);
	}

	queryParamUpdated(): void {
		this.subscriptions$.add(
			this.route.queryParams.subscribe((params: Params) => {
				const { searchTerm, genre } = params;
				this.searchTerm = searchTerm || undefined;
				this.selectedGenres = genre
					? Array.isArray(genre)
						? genre
						: [genre]
					: [];
				this.genreOptions = this.getGenreOptions(this.searchTerm);
				this.applyFiltersOnMovies();
			})
		);
	}

	searchFilterUpdated(): void {
		this.subscriptions$.add(
			this.searchKeywordUpdated$
				.pipe(debounceTime(DELAY_INTERVAL))
				.subscribe((input: string) => {
					this.navigateToMoviesPage(input, this.selectedGenres);
				})
		);
	}

	onGenreToggle(event: MatSelectChange): void {
		const selections = event.value.includes(null) ? [] : event.value;
		this.navigateToMoviesPage(this.searchTerm || "", selections);
		if (selections && selections.length) {
			// this.handlePageEvent({ pageIndex: 0, pageSize: this.pageSize } as PageEvent);
			this.paginator.firstPage();
		}
	}

	onTitleSearchInput(event: Event): void {
		const { value } = event.target as HTMLInputElement;
		if(value) {
			this.searchKeywordUpdated$.next(value || "");
			// this.handlePageEvent({ pageIndex: 0, pageSize: this.pageSize } as PageEvent);
			this.paginator.firstPage();
		}
	}

	onInputResetClick(): void {
		this.searchTerm = "";
		this.searchKeywordUpdated$.next("");
	}

	private getGenreOptions(searchTerm: string | undefined): (string | undefined)[] {
		const searchedMovies = this.listOfMovies.filter((movie: MovieModel) =>
			movie?.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
		);
		const allGenres = searchedMovies.flatMap((movie: MovieModel) => movie?.genres);
		return [...new Set(allGenres)].sort();
	}

	private applyFiltersOnMovies(): void {
		this.filteredMovies = this.listOfMovies.filter((movie: MovieModel) =>
			movie?.title?.toLowerCase().includes(this.searchTerm?.toLowerCase() || "")
		);

		if (this.selectedGenres.length) {
			this.filteredMovies = this.filteredMovies.filter((movie: MovieModel) =>
				this.selectedGenres.some((genre: string) => movie?.genres?.includes(genre))
			);
		}
	}

	private navigateToMoviesPage(searchTerm: string, genres: string[]): void {
		this.router.navigate(["/movies"], {
			queryParams: {
				searchTerm: searchTerm || undefined,
				genre: genres
			}
		});
	}

}
