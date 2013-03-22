// RequireJS UnderscoreJS template plugin
// http://github.com/jfparadis/requirejs-tpl
//
// Using UnderscoreJS micro-templates: http://underscorejs.org/#template
// @author JF Paradis
// @version 0.0.1
//
// Released under the MIT license
//
// Usage:
//   require(['backbone', 'tpl!template'], function (Backbone, template) {
//     return Backbone.View.extend({
//       initialize: function(){
//         this.render();
//       },
//       render: function(){
//         this.$el.html(template({message: 'hello'}));
//     });
//   });
//
// Configuration: (optional)
//   require.config({
//     tpl: {
//       extension: '.tpl' // default = '.html'
//     }
//   });

/*jslint nomen: true */
/*global define: false */

(function () {
    'use strict';
    var buildMap = {};

    define(['text', 'underscore'], function (text, _) {
        return {
            version: '0.0.1',

            load: function (moduleName, parentRequire, onload, config) {
               if (buildMap[moduleName]) {
                    onload(buildMap[moduleName]);

                } else {
                    var ext = (config.tpl && config.tpl.extension) || '.html';
                    text.load(moduleName + ext, parentRequire, function (source) {
                        buildMap[moduleName] = _.template(source);
                        onload(buildMap[moduleName]);
                    }, config);
                }
            },

            write: function (pluginName, moduleName, write) {
                var build = buildMap[moduleName];
                if (build && build.source) {
                    write("define('{pluginName}!{moduleName}', function () { return {source}; });\n"
                        .replace('{pluginName}', pluginName)
                        .replace('{moduleName}', moduleName)
                        .replace('{source}', build.source));
                }
            }
        };
    });
}());
