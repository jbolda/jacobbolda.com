var cssnext = require('postcss-cssnext');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

exports.modifyWebpackConfig = function(config, env) {
    config.merge({
        postcss: [
            cssnext({
                browsers: ['>1%', 'last 2 versions']
            })
        ]
    })

    config.plugin(
            'CopyWebpackPlugin',
            CopyWebpackPlugin,
            [
                [
                    { from: '../static/images/logo/favicon.ico', to: '' }
                ],
                {
                    ignore: [
                    'ignore.txt'
                    ],
                    debug: 'warning'
                }
            ]
    )

    config.loader('svg', {
       test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: 'file-loader',
    })


    config.loader('geojson', {
       test: /\.(geojson)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: 'json-loader',
    })

    return config
};
