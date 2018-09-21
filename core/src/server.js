import express from "express";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore, { initializeSession } from "./store";

const app = express();
// see here for why we do this:
// https://cloud.google.com/appengine/docs/flexible/nodejs/runtime
app.set('trust proxy', true);

app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

app.get( "/*", ( req, res ) => {
    const context = { };
    const store = createStore( );

    store.dispatch( initializeSession( ) );

    const dataRequirements =
        routes
            .filter( route => matchPath( req.url, route ) ) // filter matching paths
            .map( route => route.component ) // map to components
            .filter( comp => comp.serverFetch ) // check if components have data requirement
            .map( comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement

    Promise.all( dataRequirements ).then( ( ) => {
        const sheet = new ServerStyleSheet()
        const jsx = (
          <StyleSheetManager sheet={sheet.instance}>
            <ReduxProvider store={ store }>
              <StaticRouter context={ context } location={ req.url }>
                <Layout />
              </StaticRouter>
            </ReduxProvider>
          </StyleSheetManager>
        );
        const reactDom = renderToString(jsx);
        const styles = sheet.getStyleTags()
        const reduxState = store.getState();
        const helmetData = Helmet.renderStatic();

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( reactDom, styles, reduxState, helmetData ) );
    } );
} );

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

function htmlTemplate( reactDom, styles, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
            ${styles}
            <style>
              html {
                font-family: sans-serif;
              }
            </style>
        </head>

        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-96020301-1', 'auto');
              ga('send', 'pageview');

            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
