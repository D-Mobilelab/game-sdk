const fs = require('fs');
const path = require('path');

module.exports = function(env) {
  return function(){
      this.plugin('done', function(stats) {
        fs.writeFileSync(
          path.join(__dirname, '..', `dist/stats_${env}.json`),
          JSON.stringify(stats.toJson().assetsByChunkName)
        );
      });
  }
}
