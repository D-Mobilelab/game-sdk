GIT_REVISION=$(git describe --tags --long)
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo -n "module.exports={build:\"$GIT_REVISION\",version:\"$PACKAGE_VERSION\"}" > src/version.js;