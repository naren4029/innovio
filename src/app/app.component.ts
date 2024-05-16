import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { Subject, takeUntil } from "rxjs";

import { HeaderComponent } from "./components/header/header.component";
import { NavSliderComponent } from "./components/nav-slider/nav-slider.component";
import { NavListComponent } from "./components/nav-list/nav-list.component";
import { RecentlyVisitedMoviesComponent } from "./components/recently-visited-movies/recently-visited-movies.component";
import { HEADER_LABELS, RECENT_VISIT_PANEL_LABELS } from "./constants/labels";
import { NAVIGATION_LIST  } from "./constants/config";
import { MovieModel } from "@states/movie/movie.model";
import { RecentMovieVisitService } from "@services/recentMovieVisit/recent-movie-visit.service";
import { MovieService } from "@services/movie/movie.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
		NavSliderComponent,
		NavListComponent,
		MatButtonModule,
		RecentlyVisitedMoviesComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit, OnDestroy{

	title = "movie-website";
	headerLabels = HEADER_LABELS;
	navList = NAVIGATION_LIST;
	recentMovieVisitLabels = RECENT_VISIT_PANEL_LABELS;
	recentMovieVisits!: MovieModel[];
	destroy$ = new Subject<void>();

	constructor(private recentMovieVisited: RecentMovieVisitService,
		private movieService: MovieService) {
	}

	ngOnInit(): void {
		this.subscriptions();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	onClickRecentlyVisitedMovie(visitedMovie: MovieModel): void {
		if (visitedMovie){
			this.recentMovieVisited.addVisitedMovie(visitedMovie);
			this.movieService.onMovieSelect(visitedMovie);
		}
	}

	subscriptions(): void {
		this.recentMovieVisited.recentlyVisitedMovies$.pipe(takeUntil(this.destroy$))
			.subscribe((movies: MovieModel[]) => this.recentMovieVisits = movies);
	}

}
