GIT_REVISION=$(git describe --tags --long)
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
echo "module.exports = {\"version\":\"$PACKAGE_VERSION\", \"build\":\"$GIT_REVISION\"};" > src/version.js