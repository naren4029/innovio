import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ToggleSideNavStateModel } from "@states/toggleSideNav/toggleSideNav.model";

@Component({
	selector: "app-nav-slider",
	standalone: true,
	imports: [MatSidenavModule],
	templateUrl: "./nav-slider.component.html",
	styleUrl: "./nav-slider.component.scss"
})
export class NavSliderComponent implements OnInit, OnDestroy{

	subscription$= new Subscription();
	isOpen:ToggleSideNavStateModel = { isOpen: true };

	constructor(private store: Store) {	}

	ngOnInit(): void {
		this.subsriptions();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	subsriptions(): void {
		this.subscription$.add(
			this.store.select(state => state.toggleSideNav.isOpen)
				.subscribe(data => this.isOpen = data)
		);
	}

}
