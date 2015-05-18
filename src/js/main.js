/**
 * @name  main.js
 * @description  此文件是种子模块，描述整体结构，提供extend等基础api
 * @date  2015.05.07
 * @version  0.0.2
 */
!function(global, DOC) {

    'use strict'

    var version = 1                 // 版本号
    var chartMap = []               // 用于关联selector与图表对象

    var moduleMap = {}              // 用于amd模块
    var fileMap = {}                // 用于amd模块

    var noop = function () {}       // 用于amd模块

    var Y  = (function() {
        
        var Y = {}

        Y.extend = function() {

            for (var key in arguments[0]) {

                Y[key] = arguments[0][key]
            }
        }

        return Y
    })()

    Y.extend({

        Ycharts: version,

        // find用于读取chartMap中的对象
        find: function(selector) {

            var c = chartMap[selector]

            if (typeof c === 'undefined') {

                c = chartMap[selector] = {}
                chartMap[selector]['part'] = {}
                chartMap[selector]['chart'] = {}
            }

            return c
        },

        define: function(name, dependencies, factory) {

            if (!moduleMap[name]) {

                var module = {
                    name: name,
                    dependencies: dependencies,
                    factory: factory
                };

                moduleMap[name] = module
            }

            return moduleMap[name]
        },

        use: function(name) {

            var module = moduleMap[name]

            if (!module.entity) {

                var args = []

                for (var i = 0; i < module.dependencies.length; i++) {
                    
                    if (moduleMap[module.dependencies[i]].entity) {

                        args.push(moduleMap[module.dependencies[i]].entity)

                    } else {

                        args.push(this.use(module.dependencies[i]))
                    }
                }

                module.entity = module.factory.apply(noop, args)
            }

            return module.entity
        },

        require: function (pathArr, callback) {

            for (var i = 0; i < pathArr.length; i++) {

                var path = pathArr[i]

                if (!fileMap[path]) {

                    var head = document.getElementsByTagName('head')[0]
                    var node = document.createElement('script')

                    node.type = 'text/javascript'
                    node.async = 'true'
                    node.src = path + '.js'

                    node.onload = function () {
                        fileMap[path] = true
                        head.removeChild(node)
                        checkAllFiles()
                    }

                    head.appendChild(node)
                }
            }

            function checkAllFiles() {

                var allLoaded = true

                for (var i = 0; i < pathArr.length; i++) {

                    if (!fileMap[pathArr[i]]) {

                        allLoaded = false

                        break
                    }
                }

                if (allLoaded) {

                    callback()
                }
            }
        }
    })


    global.Y = global.Ycharts = Y

}
(window, window.document)


/**
 * 2015.5.11 整合了原有的module.js模块，使框架结构更清晰
 * 2015.5.18 修改了find函数，该函数将生成更为详细的数据结构
 */

