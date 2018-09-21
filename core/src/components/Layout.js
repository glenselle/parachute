import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import routes from "../routes";

class Layout extends React.Component {
    render() {
        return (
            <Switch>
                { routes.map( route => <Route key={ route.path } { ...route } /> ) }
            </Switch>
        );
    }
}

export default Layout;
