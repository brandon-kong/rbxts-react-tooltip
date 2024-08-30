# Getting Started

React Tooltip makes it super easy to add tooltips to your Roblox game. In this guide, we'll walk you through the process of setting up React Tooltip in your game.

## Installation

Using npm:

```bash
npm install @rbxts/react-tooltip
```

Using yarn:

```bash
yarn add @rbxts/react-tooltip
```

## Usage

To use React Tooltip in your game, you'll need to wrap a segment of your UI in the `TooltipProvider` component. This component will provide the context needed for the tooltips to work.

Here's an example of how you can use the `TooltipProvider` component:

```tsx
import React from "@rbxts/react";
import { TooltipProvider } from "@rbxts/react-tooltip";
import { Button } from "..."; // Import your button component here

const SideButtons = () => {
	return (
		<TooltipProvider>
			<Button text="Button 1" />
			<Button text="Button 2" />
			<Button text="Button 3" />
		</TooltipProvider>
	);
};
```

Once you've wrapped your UI in the `TooltipProvider` component, you'll
need to create a component that utilizes the `useTooltip` hook to display tooltips. Here's an example of how you can create a simple tooltip component:

```tsx
import React from "@rbxts/react";
import { useTooltip } from "@rbxts/react-tooltip";
import { Tooltip } from "..."; // Import your tooltip component here

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

That's it! You've successfully set up React Tooltip in your Roblox game. You can now customize the appearance and behavior of your tooltips to fit your game's style and needs.

See the [Building a Tooltip Component](/docs/tooltip/custom-tooltip) guide for more information on how to create a custom tooltip component.

See the [API Reference](/docs/installation) for more information on how to use React Tooltip.

## Note

> This package _only_ supports **React-lua**. The setup instructions for **React-lua** can be found in the [React-lua NPM package](https://www.npmjs.com/package/@rbxts/react).
