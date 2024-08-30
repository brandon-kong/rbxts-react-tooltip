---
outline: deep
---

# API Reference

This is the API reference for the Roblox React Tooltip library. Here you'll find information on the available types, hooks, and components that you can use to create powerful and flexible tooltips for your Roblox games.

## Types

### `TooltipDirection` <Badge type="info" text="type" />

The directions that a tooltip can snap to relative to the target element.

```ts
type TooltipDirection = "top" | "right" | "bottom" | "left";
```

### `TooltipProps` <Badge type="info" text="type" />

The base properties that can be passed to a custom tooltip component.

```ts
interface TooltipProps {
	position: UDim2;
	visible: boolean;
}
```

## Hooks

### `useTooltip` <Badge type="info" text="hook" />

The `useTooltip` hook is a custom hook that allows you to display tooltips in your Roblox game. By using the `useTooltip` hook, you can customize the appearance and behavior of your tooltips to fit your game's style and needs.

```ts
function useTooltip(options: {
	delay?: number;
	offset?: Vector2;
	direction?: TooltipDirection;
	followMouse?: boolean;
	component: ComponentType<TooltipProps>;
}): {
	showTooltip: () => void;
	hideTooltip: () => void;
	updatePosition: (position: UDim2) => void;
	updateSize: (size: UDim2) => void;
};
```

#### `updatePosition` <Badge type="info" text="function" />

Updates the absolute position of the hitbox element that the tooltip is anchored to.

```ts
function updatePosition(rbx: GuiObject): void;

// Example
<frame
Change={{
    AbsolutePosition: updatePosition,
}}
/>
```

#### `updateSize` <Badge type="info" text="function" />

Updates the absolute size of the hitbox element that the tooltip is anchored to.
(This function is used to calculate the position of the tooltip relative to the hitbox element.)

```ts
function updateSize(rbx: GuiObject): void;

// Example
<frame
Change={{
    AbsoluteSize: updateSize,
}}
/>
```

#### `showTooltip` <Badge type="info" text="function" />

Shows the tooltip. This function can be used on any event you want to trigger the tooltip to show.

```ts
function showTooltip(): void;

// Example 1
<textbutton
    Event={{
        MouseEnter: showTooltip,
    }}
/>

// Example 2
<textbutton
    Event={{
        MouseButton1Click: showTooltip,
    }}
/>
```

#### `hideTooltip` <Badge type="info" text="function" />

Hides the tooltip. This function can be used on any event you want to trigger the tooltip to hide.

```ts
function hideTooltip(): void;

// Example 1
<textbutton
    Event={{
        MouseLeave: hideTooltip,
    }}
/>

// Example
<textbutton 2
    Event={{
        MouseButton1Click: hideTooltip,
    }}
/>
```

## Components

### `TooltipProvider` <Badge type="info" text="component" />

The Tooltip Provider component is a context provider that allows you to use the `useTooltip` hook to display tooltips in your Roblox game. By wrapping a segment of your UI in the `TooltipProvider` component, you can easily add tooltips to your game with just a few lines of code.

```tsx
<TooltipProvider
    hideDelay?: number;
>
    {/* Your UI components that use tooltips */}
</TooltipProvider>
```
