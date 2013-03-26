// RequireJS UnderscoreJS template plugin
// http://github.com/jfparadis/requirejs-tpl
//
// An alternative to http://github.com/ZeeAgency/requirejs-tpl
//
// Using UnderscoreJS micro-templates at http://underscorejs.org/#template
// Using and RequireJS text.js at http://requirejs.org/docs/api.html#text
// @author JF Paradis
// @version 0.0.1
//
// Released under the MIT license
//
// Usage:
//   require(['backbone', 'tpl!mytemplate'], function (Backbone, mytemplate) {
//     return Backbone.View.extend({
//       initialize: function(){
//         this.render();
//       },
//       render: function(){
//         this.$el.html(mytemplate({message: 'hello'}));
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
                var build = buildMap[moduleName],
                    source = build && build.source;
                if (source) {
                    write.asModule(pluginName + '!' + moduleName,
                        "define('{pluginName}!{moduleName}', function () { return {source}; });\n"
                        .replace('{pluginName}', pluginName)
                        .replace('{moduleName}', moduleName)
                        .replace('{source}', source));
                }
            }
        };
    });
}());
