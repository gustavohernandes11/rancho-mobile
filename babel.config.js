module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"expo-router/babel",
			[
				"module-resolver",
				{
					alias: {
						assets: "./assets",
						components: "./components",
						constants: "./constants",
						contexts: "./contexts",
						database: "./database",
						hooks: "./hooks",
						styles: "./styles",
						tests: "./tests",
						types: "./types",
						utils: "./utils",
					},
				},
			],
		],
	};
};
