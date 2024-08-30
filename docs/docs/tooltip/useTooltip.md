# useTooltip

The `useTooltip` hook is a custom hook that allows you to display tooltips in your Roblox game. By using the `useTooltip` hook, you can customize the appearance and behavior of your tooltips to fit your game's style and needs.

## Usage

```tsx
import React from "@rbxts/react";
import { useTooltip } from "@rbxts/react-tooltip";

const Button = ({ text }: { text: string }) => {
	const { showTooltip, hideTooltip, updatePosition, updateSize } = useTooltip({
		component: Tooltip,
	});

	return (
		<textbutton
			Text={text}
			MouseEnter={showTooltip}
			MouseLeave={hideTooltip}
			Change={{
				AbsolutePosition: updatePosition,
				AbsoluteSize: updateSize,
			}}
		/>
	);
};
```

### Parameters

The `useTooltip` hook accepts an options object with the following properties:

| Property      | Type                          | Description                                                                        |
| ------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `delay`       | `number`                      | The delay in seconds before showing the tooltip. Default is `0`.                   |
| `offset`      | `Vector2`                     | The offset for the tooltip position. Default is `new Vector2(0, 0)`.               |
| `direction`   | `TooltipDirection`            | The direction for the tooltip. Can be `"top"`, `"bottom"`, `"left"`, or `"right"`. |
| `followMouse` | `boolean`                     | Whether the tooltip should follow the mouse cursor. Default is `false`.            |
| `component`   | `ComponentType<TooltipProps>` | The tooltip component to render.                                                   |

Behaviors:

-   If the `followMouse` property is set to `true`, the `offset` property will be ignored.
-   The default `TooltipDirection` is `"top"`.

See the [Building a Custom Tooltip](/docs/tooltip/custom-tooltip) guide for more information on how to create a custom tooltip component.

## Note

> The `useTooltip` hook will throw an error if it is used outside of a [`TooltipProvider`](/docs/tooltip/provider) component. Make sure to wrap your UI in the [`TooltipProvider`](/docs/tooltip/provider) component before using the `useTooltip` hook.
