import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ToggleSideNavAction } from "@states/toggleSideNav/toggleSideNav.action";
import { ToggleSideNavStateModel } from "@states/toggleSideNav/toggleSideNav.model";
import { HeaderModel } from "./header.model";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss"
})
export class HeaderComponent implements OnInit, OnDestroy {

	@Input() appHeaderLabels!: HeaderModel;
	toggleSideNav$!: Observable<ToggleSideNavStateModel>;
	isOpen:ToggleSideNavStateModel = { isOpen: true };
	private subscription$ = new Subscription();

	constructor(private store: Store) { }

	ngOnInit(): void {
		this.subsciptions();
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	toggleSideNavClick(): void {
		this.store.dispatch(new ToggleSideNavAction());
	}

	subsciptions(): void {
		this.toggleSideNav$ = this.store.select(state => state.toggleSideNav.isOpen);
		this.toggleSideNav$.subscribe(data => this.isOpen = data);
	}

}
