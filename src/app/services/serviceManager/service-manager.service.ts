
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { URL_CONFIG } from "@constants/config";
import { MovieModel } from "@states/movie/movie.model";

@Injectable({
	providedIn: "root"
})
export class ServiceManagerService {

	constructor(private http: HttpClient) { }

	getMovies(): Observable<MovieModel[]> {
		const { getDataURL } = URL_CONFIG;
		return this.http.get<MovieModel[]>(getDataURL);
	}

}
