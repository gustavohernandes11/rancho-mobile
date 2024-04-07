import type { Config } from "jest";

const config: Config = {
	preset: "jest-expo",
	testPathIgnorePatterns: ["/node_modules/"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
	],
	collectCoverage: true,
	coverageReporters: ["json", "html"],
	collectCoverageFrom: [
		"<rootDir>/components/**/*.tsx",
		"<rootDir>/components/*.tsx",
	],
};

export default config;
