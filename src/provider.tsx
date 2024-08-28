import React, { type PropsWithChildren, useMemo } from "@rbxts/react";
import { TooltipComponent, TooltipProviderProps } from "./types";
import TooltipContext from "./context";

export default function TooltipProvider({ hideDelay = 1, children }: PropsWithChildren<TooltipProviderProps>) {
	const [isVisible, setIsVisible] = React.useState(false);
	const [position, setPosition] = React.useState(new UDim2(0, 0, 0, 0));
	const [lastHide, setLastHide] = React.useState(0);
	const [trueVisible, setTrueVisible] = React.useState(false);
	const isVisibleRef = React.useRef(isVisible);

	const [tooltip, setTooltip] = React.useState<TooltipComponent | undefined>();

	const hideThread = React.useRef<thread>();

	const changePosition = React.useCallback(function (position: UDim2) {
		setPosition(position);
	}, []);

	const changeTooltip = React.useCallback(function (tooltip?: TooltipComponent) {
		setTooltip(tooltip);
	}, []);

	const changeVisible = React.useCallback(
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

	React.useEffect(() => {
		isVisibleRef.current = isVisible;
	}, [isVisible]);

	const Component = tooltip?.component ?? (() => <></>);

	return (
		<TooltipContext.Provider value={context}>
			{trueVisible && <Component visible={isVisible} position={position} />}

			{children}
		</TooltipContext.Provider>
	);
}
