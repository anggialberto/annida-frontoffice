const {alias, configPaths} = require('react-app-rewire-alias')
const aliasMap = configPaths('./jsconfig.json') // or jsconfig.paths.json

module.exports = alias(aliasMap)