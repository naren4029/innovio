export interface ImageModel {
	url: string | undefined;
	title: string | undefined;
}

export interface MovieModel {
	id: string | undefined;
	title: string | undefined;
	popularity: string | undefined;
	image: ImageModel | undefined;
	slug: string | undefined;
	runtime: string | undefined;
	released: string | undefined;
	genres: string[] | undefined;
	budget: number | null | undefined;
}

export interface MoviesDataModel {
	movies: MovieModel[];
}
