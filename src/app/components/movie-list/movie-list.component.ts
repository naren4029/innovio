import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SlicePipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MovieListLabelModel } from "./movies-list.model";
import { MovieModel } from "@states/movie/movie.model";
import { roundDecimalPlaces } from "@constants/utils";

@Component({
	selector: "app-movie-list",
	standalone: true,
	imports: [SlicePipe, MatCardModule, MatIconModule],
	templateUrl: "./movie-list.component.html",
	styleUrl: "./movie-list.component.scss",
})
export class MovieListComponent {

	@Output() readonly selectedMovie = new EventEmitter<MovieModel>();
	@Input() labels!: MovieListLabelModel;
	@Input() movies!: MovieModel[];
	@Input() startIndex!: number;
	@Input() endIndex!: number;

	roundDecimalPlaces(value: string | undefined): number | string {
		return roundDecimalPlaces(value, 2);
	}

}
