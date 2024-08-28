import React from "@rbxts/react";
import type { TooltipContext } from "./types";

const TooltipContext = React.createContext<TooltipContext>({
	visible: false,
	lastHide: 0,
	changeTooltip: () => {},
	changePosition: () => {},
	changeVisible: () => {},
});

export = TooltipContext;
