# Storybooks

Storybooks are a great way to develop and test components in isolation. They allow you to develop components without needing to navigate through your application to find them. Storybooks are also a great way to document your components and their various states.

`react-tooltip` supports storybooking libraries like [`UI Labs`](https://pepeeltoro41.github.io/ui-labs/) and [`Flipbook`](https://flipbook-labs.github.io/flipbook/) out of the box. You can use these libraries to create stories for your components and test them in isolation.

The only requirement for using `react-tooltip` with storybooks is that you need to wrap your UI in the `TooltipProvider` component.

## Examples

UI Labs:

```tsx
// stories/button.story.tsx
import { Button } from "@client/components/button";
import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";

import { CreateReactStory } from "@rbxts/ui-labs";
import { TooltipProvider } from "@rbxts/react-tooltip";

const controls = {
	text: "Hello, world!",
};

const story = CreateReactStory(
	{
		react: React,
		controls: controls,
		reactRoblox: ReactRoblox,
	},
	(controls) => {
		return (
			<TooltipProvider>
				{" "}
				{/* Wrap your UI in the TooltipProvider component */}
				<Button
					text={"Hello world!"}
					onClick={() => {
						print("Button clicked");
					}}
				/>
			</TooltipProvider>
		);
	},
);

export = story;
```
