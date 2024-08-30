# Tooltip Provider

The Tooltip Provider component is a context provider that allows you to use the [`useTooltip`](/docs/tooltip/useTooltip) hook to display tooltips in your Roblox game. By wrapping a segment of your UI in the `TooltipProvider` component, you can easily add tooltips to your game with just a few lines of code.

## Common Patterns

You only need to wrap your components that use tooltips in the `TooltipProvider` component. You can think of the `TooltipProvider` component as a container that provides the context needed for the tooltips to work.

For example, rather than wrapping your _entire_ UI in the `TooltipProvider` component, you can wrap a specific segment of your UI that contains the components that use tooltips.

This allows you to have more control over where and how tooltips are displayed in your game.

See the [Examples](/docs/installation) page for more examples of how to use the `TooltipProvider` component.

## Configuration

The `TooltipProvider` component accepts the following props:

| Property    | Type      | Description                                                                                                       | Default |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| `children`  | ReactNode | The child components that will be wrapped by the `TooltipProvider` component.                                     | N/A     |
| `hideDelay` | number    | The delay in seconds before the tooltip is hidden after the user moves their cursor away from the target element. | 1       |

The `hideDelay` property can be useful if you want to give users more time to read the tooltip before it disappears. It was also added to give animating tooltips more time to animate before the tooltip is hidden.

Additionally, it reduces potential memory leaks by unmounting the tooltip after the delay has passed.

We recommend setting the `hideDelay` property to a reasonable value so that users have enough time to read the tooltip without it disappearing too quickly.

## Usage

```tsx
import React from "@rbxts/react";
import { TooltipProvider } from "@rbxts/react-tooltip";

const App = () => {
	return (
		<TooltipProvider
			hideDelay={2} // Set the hide delay to 2 seconds
		>
			{/* Your UI components that use tooltips */}
		</TooltipProvider>
	);
};
```
