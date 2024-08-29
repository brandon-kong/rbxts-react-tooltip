import React, { type PropsWithChildren, useCallback, useEffect, useMemo, useState, useRef } from "@rbxts/react";
import { TooltipComponent, TooltipComponentObject, TooltipProviderProps } from "./types";
import TooltipContext from "./context";

/**
 * TooltipProvider component provides context for tooltips.
 * It wraps an element or a set of elements with a context which can be used to group tooltips.
 *
 * @param {TooltipProviderProps} props - The props for TooltipProvider.
 * @param {number} [props.hideDelay=1] - Delay in seconds before hiding the tooltip. Default is 1 second.
 * @param {React.ReactNode} props.children - The children components.
 * @returns {JSX.Element} The TooltipProvider component.
 *
 * @example
 * ```tsx
 * import TooltipProvider from './TooltipProvider';
 * import Tooltip from './Tooltip';
 *
 * function Component() {
 *   return (
 *     <TooltipProvider hideDelay={2}>
 *       <ButtonWithTooltip />
 *     </TooltipProvider>
 *   );
 * }
 * ```
 */
export default function TooltipProvider({
	hideDelay = 1,
	children,
}: PropsWithChildren<TooltipProviderProps>): JSX.Element {
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

			if (hideDelay <= 0) {
				setTrueVisible(false);
				return;
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
