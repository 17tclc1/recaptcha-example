/**
 * @typedef {{name: string, prefix: string}} RouterGroupOption
 * @typedef {{method: string, path: string, handler: function}} Route
 * 
 * @param {RouterGroupOption} groupOptions 
 * @param {Route} routes 
 * @returns {Array<Route>}
 */
const routerGroup = (groupOptions, routes) => {
  return routes.map(route => {
    return {
      ...route,
      // Paste absolute path
      path: '/' + [groupOptions.prefix, route.path].map( path => path.replace(/(^\/|\/$)/g, '') ).join('/')
    }
  })
};
module.exports = {
  routerGroup,
}
