const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

//leer el coduigo comprimido de js:
const HtmlWebpackPlugin = require('html-webpack-plugin');
//leer y minificar css:
mini_css_stract_plugins = require('mini-css-extract-plugin');
module.exports = {
    //enty ba a indicar sdonde esta mi archivo principal del frontend
    entry: './frontend/app.js',
    //output dira donde esta su archivo reconvertido.
    output: {
        path: path.join(__dirname, 'backend/public'),
        //le damos un nombre al alchivo generaado.
        filename: 'js/bundle.js',

    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader' : mini_css_stract_plugins.loader,
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./frontend/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            }
        }),
        new mini_css_stract_plugins({
            filename: 'css/bundle.css'
        })
    ],
    devtool: 'source-map'
};