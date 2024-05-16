import { Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { MovieComponent } from "./pages/movie/movie.component";
import { MoviesComponent } from "./pages/movies/movies.component";

export const routes: Routes = [{ path: "home", component: HomeComponent },
	{ path: "movies", component: MoviesComponent },
	{ path: "movie/:slug", component: MovieComponent },
	{ path: "**", redirectTo: "home" },];
