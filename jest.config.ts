import type { Config } from "jest";

const config: Config = {
	preset: "jest-expo",
	testPathIgnorePatterns: ["/node_modules/"],
	collectCoverage: true,
	coverageReporters: ["json", "html"],
	collectCoverageFrom: [
		"<rootDir>/components/**/*.tsx",
		"<rootDir>/components/*.tsx",
	],
};

export default config;
