# MovieWebsite

Welcome to the Movie App! This application allows users to explore popular movies, search for specific titles, filter by genre, and view detailed information about individual movies.

 ## Features

### Home Page

Displays a list of the top 10 popular movies.
Provides links to navigate to the home page and the movies page.

### Movies Page

Lists all available movies.
Real-time search functionality:
As the user types in the search field, the movie list updates in real time with the search results.
There is a 500ms delay between the user typing and the update of results.
The URL contains the searchTerm as a query parameter.

### Genre filtering

Dropdown with multi-select functionality:
Users can select multiple genres.
Option to clear all selected genres.
Clicking an already selected genre deselects it.
When selecting/deselecting a genre, the URL reflects the chosen genres.
Genre list updates based on the searched results only.
Search and genre filtering work in conjunction:
Example URL: http://localhost:4200/movies?searchTerm=dragon&genre=Adventure
Refreshing the page retains the user’s filter/search.
Clearing the search does not clear the movie genre filter and vice versa.

### Movie Page

Displays detailed information about an individual movie:

### Movie poster

Title
Genres
Popularity (rounded to 2 decimal places)
Budget (Currency set to Euro)
Uses the Movie.slug for the URL parameter.

### Last Visited Movies

Located at the bottom of all pages.
Shows the 5 most recently visited movies.
Does not contain duplicate movies.
Ordered by last visited first.
Persists even after the user refreshes the browser.

## Getting Started

Clone this repository.
Install dependencies: npm install.
Start the development server: npm start.

Usage
Open the app in your browser (usually at http://localhost:4200).

Explore popular movies, search, and filter by genre.

### Requirements

Create a mini movie website which contains;

- Home page \* List top 10 popular movies
- Side menu \* Links to `home` and `movies`
- Movies page
  _ List of all movies
  _ Search
  _ When the user types inside the search field, the movies list should update in real time with the results
  _ There should be a 500ms delay between the user typing and updating of results \* The URL should contain the `search term` as a query param
  - Drop down filter by genre
    _ Dropdown should be a multi-select, user must be able to select multiple genres
    _ User should have an option to clear all selected genres
    _ Clicking an already selected genre deselects it
    _ When selecting/deselecting a genre from the list, it should be reflected inside the URL \* Genre list should be updated depending on the searched results only
  - Search and genres filtering should work in conjunction e.g. `http://localhost:4200/movies?searchTerm=dragon&genre=Adventure`
    - Refreshing should keep the user's filter / search
    - Clearing the search should not clear the movie genre filter and vice versa
- Movie page
  _ Contains the movie poster and all the movie details
  _ `Title`
  _ `Genres`
  _ `Popularity` rounded to 2 decimal places
  _ `Budget` Currency set to Euro
  _ Use the `Movie.slug` for the `URL` param
- Last Visited Movies
  _ At the bottom for all pages, have a section called `Last Visited`
  _ Movie is considered as `Last Visited` when the user has navigated to the Movie Page
  _ Only Show the 5 last recently visited movies
  _ Should not contain duplicate movies
  _ Should be ordered by last visited first
  _ Should be persisted even after the user refreshes the browser
- Linting
  - Project should pass all lint rules


## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `npm run lint` to lint the project. This will lint both `ts` and `scss` files.

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `npm run lint` to lint the project. This will lint both `ts` and `scss` files.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

![image](https://github.com/naren4029/innovio/assets/36468188/dab1c6ed-60ee-444e-a0fa-a92c52f11ec6)

