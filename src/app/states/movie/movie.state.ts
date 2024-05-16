import { Injectable, OnDestroy } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import { LoadMovies } from "./movie.action";
import { MoviesDataModel } from "./movie.model";
import { Subject, catchError, takeUntil } from "rxjs";
import { ServiceManagerService } from "@services/serviceManager/service-manager.service";

@State<MoviesDataModel>({
	name: "moviesList",
	defaults: {
		movies: [],
	}
})

@Injectable({ providedIn: "root" })
export class MovieState implements NgxsOnInit, OnDestroy  {

	private destroy$ = new Subject<void>();

	constructor(private serviceManager: ServiceManagerService) { }

	ngxsOnInit(ctx: StateContext<MoviesDataModel>): void {
		ctx.dispatch(new LoadMovies());
	}

	@Action(LoadMovies)
	loadMovies(ctx: StateContext<MoviesDataModel>): void {
		this.serviceManager.getMovies()
			.pipe(takeUntil(this.destroy$))
			.pipe(
				catchError(err => {
					console.error("Unable to feth movies data", err);
					throw err;
				})
			)
			.subscribe(movies => {
				const state = ctx.getState();
				ctx.setState({
					...state,
					movies
				});
			});
	}

	ngOnDestroy():void {
		this.destroy$.next();
		this.destroy$.complete();
	}

}
