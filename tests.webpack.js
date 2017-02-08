// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind
// this regex matches any js files in __tests__ directories

var testsContext = require.context('./src', true, /-test\.js$/);
testsContext.keys().forEach(testsContext);
