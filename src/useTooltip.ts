import React, { createContext, useCallback, useContext, useRef, useState } from "@rbxts/react";
import { UserInputService, RunService } from "@rbxts/services";
import type { TooltipDirection, UseTooltipParams, TooltipContext, TooltipComponent } from "./types";
import useSignal from "./useSignal";

const MARGIN = 30;
const DELAY_SKIP_DURATION = 1;

const getDirectionPosition = (direction: TooltipDirection, absolutePosition: Vector2, absoluteSize: Vector2) => {
	let X = absolutePosition.X;
	let Y = absolutePosition.Y;

	switch (direction) {
		case "top":
			X += absoluteSize.X / 2;
			Y -= MARGIN;
			break;
		case "bottom":
			X += absoluteSize.X / 2;
			Y += absoluteSize.Y + MARGIN;
			break;
		case "left":
			X -= MARGIN;
			Y += absoluteSize.Y / 2;
			break;
		case "right":
			X += absoluteSize.X + MARGIN;
			Y += absoluteSize.Y / 2;
			break;
	}

	return new Vector2(X, Y);
};

const TooltipContext = createContext<TooltipContext>({
	visible: false,
	lastHide: 0,
	changeTooltip: () => {},
	changePosition: () => {},
	changeVisible: () => {},
});

function useTooltip(params?: UseTooltipParams) {
	const context = useContext(TooltipContext);

	if (context === undefined) {
		error("[useTooltip]: useTooltip must be used within a TooltipProvider");
	}

	const [isVisible, setIsVisible] = useState(false);

	const offset = useRef<Vector2>(params?.offset ?? new Vector2(0, 0));
	const delay = useRef<number>(params?.delay ?? 0);
	const direction = useRef<TooltipDirection | undefined>(params?.direction);
	const mousePosition = useRef<Vector2>(new Vector2(0, 0));

	const [absolutePosition, setAbsolutePosition] = React.useState(new Vector2(0, 0));
	const [absoluteSize, setAbsoluteSize] = React.useState(new Vector2(0, 0));

	const delayThread = React.useRef<thread>();

	const showTooltip = useCallback(() => {
		if (delayThread.current) {
			task.cancel(delayThread.current);
		}

		// if the last hide was less than 1 seconds ago, skip the delay
		if (os.time() - context.lastHide < DELAY_SKIP_DURATION) {
			delayThread.current = task.delay(0, () => {
				context.changeTooltip(params?.component);
				setIsVisible(true);
				context.changeVisible(true);
			});
			return;
		}

		delayThread.current = task.delay(delay.current, () => {
			context.changeTooltip(params?.component);
			setIsVisible(true);
			context.changeVisible(true);
		});
	}, [context.lastHide]);

	const hideTooltip = useCallback(() => {
		if (delayThread.current) {
			task.cancel(delayThread.current);
		}

		setIsVisible(false);
		context.changeVisible(false);
	}, []);

	useSignal(RunService.RenderStepped, () => {
		if (params?.followMouse) {
			const location = UserInputService.GetMouseLocation();

			if (!isVisible) {
				return;
			}

			const [X, Y] = [location.X + offset.current.X, location.Y + offset.current.Y];

			mousePosition.current = new Vector2(X, Y);
			context.changePosition(new UDim2(0, X, 0, Y));
			return;
		} else if (direction.current !== undefined) {
			if (!isVisible) {
				return;
			}

			const position = getDirectionPosition(direction.current, absolutePosition, absoluteSize);

			const [X, Y] = [position.X + offset.current.X, position.Y + offset.current.Y];

			mousePosition.current = new Vector2(X, Y);
			context.changePosition(new UDim2(0, X, 0, Y));
			return;
		}
	});

	const updatePosition = useCallback((rbx: GuiObject) => {
		const position = rbx.AbsolutePosition;
		setAbsolutePosition(new Vector2(position.X, position.Y));
	}, []);

	const updateSize = useCallback((rbx: GuiObject) => {
		const size = rbx.AbsoluteSize;
		setAbsoluteSize(new Vector2(size.X, size.Y));
	}, []);

	return { showTooltip, hideTooltip, updatePosition, updateSize };
}

export default useTooltip;
