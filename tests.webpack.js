// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind
// this regex matches any js files in __tests__ directories
var context = require.context('./src/js', true, /__tests__\/.+\.js$/);
context.keys().forEach(context);
