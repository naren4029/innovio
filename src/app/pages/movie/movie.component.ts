import { Component, OnInit, OnDestroy } from "@angular/core";
import { formatCurrency } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { Subscription, combineLatest } from "rxjs";
import { MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MovieModel } from "@states/movie/movie.model";
import { EURO } from "@constants/config";
import { RecentMovieVisitService } from "@services/recentMovieVisit/recent-movie-visit.service";
import { roundDecimalPlaces } from "@constants/utils";

@Component({
	selector: "app-movie",
	standalone: true,
	imports: [MatIconModule, MatLabel],
	templateUrl: "./movie.component.html",
	styleUrl: "./movie.component.scss"
})

export class MovieComponent implements OnInit, OnDestroy{

	selectedMovie!: MovieModel;
	private subscription$ = new Subscription();

	constructor(private store: Store,
		private router: ActivatedRoute,
		private recentMovieVisited:RecentMovieVisitService) {
	}

	subscriptions(): void {

		this.subscription$.add(
			combineLatest([this.store.select(state => state.moviesList.movies), this.router.paramMap]).subscribe(([listOfMovies, params]) => {
				const movieSlug = params.get("slug") || "";
				this.selectedMovie = listOfMovies.find((movie: MovieModel) => movie.slug === movieSlug);

				if (this.selectedMovie) {
					setTimeout(()=> this.recentMovieVisited.addVisitedMovie(this.selectedMovie),0);
				}
			})
		);
	}

	ngOnInit(): void {
		this.subscriptions();
	}

	ngOnDestroy(): void {
		if (this.subscription$) {
			this.subscription$.unsubscribe();
		}
	}

	formatCurrencyValue(value: number | null | undefined): string{
		return (!value)? "":formatCurrency(value, "en-UK", EURO, "EUR", "1.0-0");
	}

	roundDecimalPlaces(value: string | undefined): number | string {
		return roundDecimalPlaces(value, 2);
	}

}
