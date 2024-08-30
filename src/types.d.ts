import TooltipProvider from "./provider";
import useTooltip from "./useTooltip";

export type TooltipDirection = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
	position: UDim2;
	visible: boolean;
};

export type TooltipComponentObject = {
	component?: TooltipComponent;
};

export type TooltipComponent = (params: TooltipProps) => JSX.Element;

export type UseTooltipParams = {
	offset?: Vector2;
	direction?: TooltipDirection;
	delay?: number;
	followMouse?: boolean;
	component?: TooltipComponent;
};

export type TooltipContext = {
	visible: boolean;
	lastHide: number;
	changePosition: (position: UDim2) => void;
	changeVisible: (visible: boolean) => void;
	changeTooltip: (tooltip?: TooltipComponentObject) => void;
};

export interface TooltipProviderProps {
	hideDelay?: number;
}

export type TooltipProvider = typeof TooltipProvider;
export type UseTooltip = typeof useTooltip;
