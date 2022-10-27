"use strict";
const mode = "development";

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
        photoshop:"require('photoshop')",
        uxp:"require('uxp')",
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
};