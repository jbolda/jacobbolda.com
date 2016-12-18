import htmlFrontMatter from 'html-frontmatter'
import objectAssign from 'object-assign'
import Shell from 'child_process'

var rucksack = require('rucksack-css')
var lost = require("lost")
var cssnext = require("postcss-cssnext")

exports.modifyWebpackConfig = function(config, env) {
    config.merge({
        postcss: [
            lost(),
            rucksack(),
            cssnext({
                browsers: ['>1%', 'last 2 versions']
            })
        ]
    })

    config.loader('svg', {
       test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: 'file-loader',
    })

    // config.loader('js', function (content) {
    //     this.cacheable()
    //     const data = objectAssign({}, htmlFrontMatter(content), { body: content })
    //     this.value = data
    //     return `module.exports = ${JSON.stringify(data)}`
    // })


    return config
};

function postBuild(pages, callback) {
  Shell.execSync("cp -r static/* /")
  callback()
}
