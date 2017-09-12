// jest.config.js
/* eslint-disable */
module.exports = {
    "transform": { ".*": "<rootDir>/node_modules/jest-css-modules" },
    verbose: true,
    collectCoverageFrom: [
        'src/**.{js,jsx}',
        '!**/node_modules/**',
        '!src/sdk.webview.js',
        '!src/index.js',
        '!src/LazilyLoad.js',
        '!src/version.js',
        '!src/SDK.js',
        '!src/store.js',
    ]
};