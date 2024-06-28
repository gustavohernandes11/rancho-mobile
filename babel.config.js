module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        assets: "./assets",
                        components: "./components",
                        services: "./services",
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
