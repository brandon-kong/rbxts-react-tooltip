import React, { type PropsWithChildren, useCallback, useEffect, useMemo, useState, useRef } from "@rbxts/react";
import { TooltipComponent, TooltipComponentObject, TooltipProviderProps } from "./types";
import TooltipContext from "./context";

export default function TooltipProvider({ hideDelay = 1, children }: PropsWithChildren<TooltipProviderProps>) {
	const [isVisible, setIsVisible] = useState(false);
	const [position, setPosition] = useState(new UDim2(0, 0, 0, 0));
	const [lastHide, setLastHide] = useState(0);
	const [trueVisible, setTrueVisible] = useState(false);
	const isVisibleRef = useRef(isVisible);

	const [tooltip, setTooltip] = useState<TooltipComponentObject | undefined>();

	const hideThread = useRef<thread>();

	const changePosition = useCallback(function (position: UDim2) {
		setPosition(position);
	}, []);

	const changeTooltip = useCallback(function (tooltip?: TooltipComponentObject) {
		setTooltip(tooltip);
	}, []);

	const changeVisible = useCallback(
		function (visible: boolean) {
			setIsVisible(visible);

			if (visible) {
				setTrueVisible(true);
				return;
			}

			setLastHide(os.time());

			if (hideThread.current) {
				task.cancel(hideThread.current);
			}

			hideThread.current = task.delay(hideDelay, () => {
				if (isVisibleRef.current === false) {
					setTrueVisible(false);
				}
			});
		},
		[isVisible, hideThread],
	);

	const context = useMemo(() => {
		return {
			visible: isVisible,
			lastHide,
			changePosition,
			changeVisible,
			changeTooltip,
		};
	}, [lastHide, isVisible, changePosition, changeVisible]);

	useEffect(() => {
		isVisibleRef.current = isVisible;
	}, [isVisible]);

	const Component: TooltipComponent = tooltip?.component ?? (() => <></>);

	return (
		<TooltipContext.Provider value={context}>
			{trueVisible && <Component visible={isVisible} position={position} />}

			{children}
		</TooltipContext.Provider>
	);
}
