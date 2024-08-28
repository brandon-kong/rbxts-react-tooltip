import TooltipProvider from "./provider";
import useTooltip from "./useTooltip";

export type TooltipDirection = "top" | "bottom" | "left" | "right";

export type TooltipComponentProps = {
	position: UDim2;
	visible: boolean;
};

export type TooltipComponent = (params: TooltipComponentProps) => JSX.Element;

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
	changeTooltip: (tooltip?: TooltipComponent) => void;
};

export interface TooltipProviderProps {
	hideDelay?: number;
}

export type TooltipProvider = typeof TooltipProvider;
export type UseTooltip = typeof useTooltip;
