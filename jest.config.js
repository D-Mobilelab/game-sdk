// jest.config.js
/* eslint-disable */
module.exports = {    
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!src/sdk.webview.js',
        '!src/index.js',
        '!src/LazilyLoad.js',
        '!src/version.js',
        '!src/SDK.js',
        '!src/store.js',
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    }
};