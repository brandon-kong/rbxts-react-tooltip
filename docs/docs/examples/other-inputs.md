---
outline: deep
---

# Using Tooltips with Other Inputs

Most of the examples in this documentation use buttons as the target element for tooltips. However, you can use tooltips with any input element in Roblox. This section will show you how to use tooltips with other input elements like text boxes.

When using the `useTooltip` hook, you can pass the `showTooltip` and `hideTooltip` functions to the appropriate event handlers for any event. For example, you can use the `FocusLost` and `Focused` events for a text box to show and hide the tooltip.

Here's an example of how you can use tooltips with a text box:

```tsx
import React from "@rbxts/react";
import { useTooltip } from "@rbxts/react-tooltip";
import { Tooltip } from "..."; // Import your tooltip component here

const TextBox = ({ text }: { text: string }) => {
	const { showTooltip, hideTooltip, updatePosition, updateSize } = useTooltip({
		component: Tooltip,
	});

	return (
		<textbox
			Text={text}
			Focused={showTooltip}
			FocusLost={hideTooltip}
			Change={{
				AbsolutePosition: updatePosition,
				AbsoluteSize: updateSize,
			}}
		/>
	);
};
```
