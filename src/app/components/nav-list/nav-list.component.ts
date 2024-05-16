import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { NAVIGATION_LIST  } from "@constants/config";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-nav-list",
	standalone: true,
	imports: [RouterModule, MatIconModule, MatListModule],
	templateUrl: "./nav-list.component.html"
})
export class NavListComponent implements OnInit, OnDestroy{

	@Input() navList = NAVIGATION_LIST;
	currentRoute= "";
	private subscription$ = new Subscription();

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.subscrpitions();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	subscrpitions(): void {
		this.subscription$.add(
			this.router.events.subscribe(event => {
				if (event instanceof NavigationEnd) {
					this.currentRoute = event.url;
				}
			})
		);
	}

}
