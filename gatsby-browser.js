import ReactGA from 'react-ga'
import {config} from 'config'

ReactGA.initialize(config.googleAnalyticsId);

exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.pathname);
};

exports.modifyRoutes = routes => {
    routes.pages.forEach(route => route.path = route.path.replace(/\/$/, ''));
    routes.childRoutes = recursiveRouteMod(routes.childRoutes);
    console.log(routes)
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