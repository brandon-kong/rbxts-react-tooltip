import React from "@rbxts/react";
import type { TooltipContext as ITooltipContext } from "./types";

export const TooltipContext = React.createContext<ITooltipContext>({
	visible: false,
	lastHide: 0,
	changeTooltip: () => {},
	changePosition: () => {},
	changeVisible: () => {},
});

export default TooltipContext;
