import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStore } from "@ngxs/store";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { withNgxsLoggerPlugin } from "@ngxs/logger-plugin";
import { withNgxsReduxDevtoolsPlugin } from "@ngxs/devtools-plugin";
import { withNgxsStoragePlugin } from "@ngxs/storage-plugin";
import { environment } from "../environments/environment";
import { ToggleSideNavState } from "./states/toggleSideNav/toggleSideNav.state";
import { MovieState } from "./states/movie/movie.state";

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch()),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideStore(
			[ToggleSideNavState, MovieState],
			{ developmentMode: !environment.production, selectorOptions: {} },
			withNgxsLoggerPlugin({ logger: console, collapsed: false, disabled: true }),
			withNgxsReduxDevtoolsPlugin({ disabled: environment.production }),
			withNgxsStoragePlugin({ keys: ["*"] }),
		),
	],
};
