/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  preset: "jest-playwright-preset",
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  bail: true,
  bail: 1,
  // testMatch: [
  //   "<rootDir>/src/hubSpot/**/**.ts"
  // ]
  testMatch: [
    "**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"
  ]
};