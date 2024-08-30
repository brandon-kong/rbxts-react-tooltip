import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "@rbxts/react-tooltip",
	description: "Documentation for NPM package: @rbxts/react-tooltip",
	base: "/rbxts-react-tooltip/",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Examples", link: "/markdown-examples" },
		],

		sidebar: [
			{
				text: "Get Started",
				items: [
					{ text: "Introduction", link: "/docs/introduction" },
					{ text: "Installation", link: "/docs/installation" },
				],
			},

			{
				text: "Tooltip",
				items: [
					{ text: "TooltipProvider", link: "/docs/tooltip/provider" },
					{ text: "useTooltip", link: "/docs/tooltip/useTooltip" },
					{ text: "Building a Custom Tooltip", link: "/docs/tooltip/custom-tooltip" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
	},
});
