exports.modifyRoutes = routes => {
    routes.pages.forEach(route => route.path = route.path.replace(/\/$/, ''));
    routes.childRoutes = recursiveRouteMod(routes.childRoutes);
    return routes;
};

let recursiveRouteMod = (childRoutes) => {
    childRoutes.forEach(route => {
        route.path = route.path.replace(/\/$/, '')
        if (route.childRoutes != undefined) {
            recursiveRouteMod(route.childRoutes)
        }
    });
    return childRoutes;
}
