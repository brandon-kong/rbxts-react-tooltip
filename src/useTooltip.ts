import React, { useCallback, useRef } from "@rbxts/react";
import { UserInputService, RunService } from "@rbxts/services";
import type { TooltipDirection, UseTooltipParams } from "./types";
import useSignal from "./useSignal";
import TooltipContext from "./context";

const DEFAULT_DIRECTION: TooltipDirection = "top";
const MARGIN = 30;
const DELAY_SKIP_DURATION = 1;

const getDirectionPosition = (
	direction: TooltipDirection,
	absolutePosition: Vector2,
	absoluteSize: Vector2,
	offset?: Vector2,
) => {
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

	if (offset) {
		X += offset.X;
		Y += offset.Y;
	}

	return new Vector2(X, Y);
};

export function useTooltip(params?: UseTooltipParams) {
	const context = React.useContext(TooltipContext);

	if (context === undefined) {
		error("[useTooltip]: useTooltip must be used within a TooltipProvider");
	}

	const [isVisible, setIsVisible] = React.useState(false);

	const delay = useRef<number>(params?.delay ?? 0);
	const offset = useRef<Vector2>(params?.offset ?? new Vector2(0, 0));
	const direction = useRef<TooltipDirection | undefined>(params?.direction ?? undefined);

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
				context.changeTooltip({
					component: params?.component,
				});
				setIsVisible(true);
				context.changeVisible(true);
			});
			return;
		}

		delayThread.current = task.delay(delay.current, () => {
			context.changeTooltip({
				component: params?.component,
			});
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
		if (params?.followMouse === true) {
			const location = UserInputService.GetMouseLocation();
			const [X, Y] = [location.X + offset.current.X, location.Y + offset.current.Y];
			context.changePosition(new UDim2(0, X, 0, Y));
			return;
		} else {
			direction.current = params?.direction ?? DEFAULT_DIRECTION;

			if (!isVisible) {
				return;
			}

			const position = getDirectionPosition(direction.current, absolutePosition, absoluteSize, offset.current);

			context.changePosition(new UDim2(0, position.X, 0, position.Y));
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
