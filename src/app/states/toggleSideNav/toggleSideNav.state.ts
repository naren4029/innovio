import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ToggleSideNavStateModel } from "./toggleSideNav.model";
import { ToggleSideNavAction } from "./toggleSideNav.action";

@State<ToggleSideNavStateModel>({
	name: "toggleSideNav",
	defaults: { isOpen: true }
})

@Injectable({ providedIn: "root" })
export class ToggleSideNavState {

	@Action(ToggleSideNavAction)
	toggleSideNav(ctx: StateContext<ToggleSideNavStateModel>):void {
		const state = ctx.getState();
		ctx.setState({
			...state,
			isOpen: !state.isOpen
		});
	}

}
