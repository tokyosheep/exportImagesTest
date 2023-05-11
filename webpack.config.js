"use strict";
const mode = "development";
const webpack = require('webpack');

module.exports = {
    mode:mode,
    devtool:"source-map",
    target:"node",
    entry:"./src/index.ts",
    output:{
        path:`${__dirname}/dist`,
        filename:"main.min.js"
    },
    externals:{
      uxp: 'commonjs2 uxp',
      photoshop: 'commonjs2 photoshop',
      os: 'commonjs2 os',
      fs: 'commonjs2 fs'
    },
    module:{
        rules:[
            {
                test:/\.ts/,
                use:"ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins: [
        new webpack.DefinePlugin({
          HASPROTOCOL: true
        })
      ]
};