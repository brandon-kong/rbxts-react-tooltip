# Building a Custom Tooltip

In this guide, you'll learn how to create a custom tooltip component using the `react-tooltip` library. You'll learn how to customize the appearance and behavior of your tooltips to fit your game's style and needs.

## Components

To create a custom tooltip component, you'll need to create a new component that renders the tooltip content. The tooltip component should accept the following props:

| Property  | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `positon` | `UDim2`   | The position of the tooltip.    |
| `visible` | `boolean` | Whether the tooltip is visible. |

Here's an example of a simple tooltip component:

```tsx
import React from "@rbxts/react";
import type { TooltipProps } from "@rbxts/react-tooltip";

export const Tooltip = ({ position, visible }: TooltipProps) => {
	return (
		<frame
			Visible={visible}
			Position={position}
			BackgroundTransparency={0.5}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Size={new UDim2(0, 100, 0, 50)}
		>
			<uilistlayout FillDirection="Vertical" />
			<textlabel
				Text="Tooltip Content"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
			/>
		</frame>
	);
};
```

As you can see, `react-tooltip` gives you the flexibility to create custom tooltips from scratch. There is very little boiletplate code required to create a custom tooltip component.

## Common Patterns

You might want your tooltip component to have more properties such as `text` or `icon` to display different types of tooltips. You can easily add these properties to your tooltip component to make it more flexible.

One way you can do this it to create a new component that extends the `TooltipProps` interface and adds additional properties:

```tsx
import React from "@rbxts/react";
import type { TooltipProps } from "@rbxts/react-tooltip";

export const Tooltip = ({ position, visible, text }: TooltipProps & { text: string }) => {
	return (
		<textlabel
			Text={text}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={0}
			Size={new UDim2(1, 0, 1, 0)}
			AutomaticSize={Enum.AutomaticSize.X}
		>
			<uicorner CornerRadius={new UDim(0, 4)} />
		</textlabel>
	);
};
```

In the `useTooltip` hook, you can pass additional properties to the tooltip component:

```tsx
import React from "@rbxts/react";
import { useTooltip } from "@rbxts/react-tooltip";
import { Tooltip } from "..."; // Import your tooltip component here

const Button = ({ text }: { text: string }) => {
	const { showTooltip, hideTooltip, updatePosition, updateSize } = useTooltip({
		component: (props) => <Tooltip {...props} text={text} />,
		text,
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

## The "`visible`" Property

You might be wondering, "What's the point of the `visible` property when I can specify the `hideDelay` in the `TooltipProvider` component?"

This is a good question! The `hideDelay` property in the `TooltipProvider` component is used to specify the delay before the tooltip is hidden after the user moves their cursor away from the target element. It will automatically unmount the tooltip after the specified delay.

The `visible` property is where `react-tooltip` shows its true power. In scenarios where you want to apply a custom hide animation to the tooltip, you can use the `visible` property to control the visibility of the tooltip and apply custom animations when the tooltip is shown or hidden.

Here's an example of how you can use the `visible` property to apply a fade-in and fade-out animation to the tooltip:

```tsx
import { TooltipProps } from "@rbxts/react-tooltip";
import { useSpring } from "..."; // Import your favorite declarative animation library here

export const Tooltip = ({ position, visible, text }: TooltipComponentProps & { text: string }) => {
	const opacity = useSpring(visible ? 0 : 1);

	return (
		<canvasgroup
			GroupTransparency={opacity} // Use the opacity value from the animation library to apply a smooth fade-in and fade-out effect
			Position={position}
			Size={new UDim2(0, 0, 0, 40)}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(0, 0, 0)}
			AutomaticSize={Enum.AutomaticSize.X}
			AnchorPoint={new Vector2(0.5, 0.5)}
		>
			<uipadding
				PaddingTop={new UDim(0, 4)}
				PaddingBottom={new UDim(0, 4)}
				PaddingLeft={new UDim(0, 8)}
				PaddingRight={new UDim(0, 8)}
			/>
			<uicorner CornerRadius={new UDim(0, 4)} />
			<textlabel
				Text={text}
				TextColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={1}
				Size={new UDim2(0, 0, 1, 0)}
				TextScaled={true}
				AutomaticSize={Enum.AutomaticSize.X}
			/>
		</canvasgroup>
	);
};
```

Result:

![Tooltip Example](/public/videos/animated-tooltip.mp4)
