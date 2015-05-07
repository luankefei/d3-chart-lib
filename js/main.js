/**
 * @name  main.js
 * @description  此文件描述结构，提供extend等基础api
 * @date  2015.05.07
 * @version  0.0.2
 */
(function(window, undefined) {

    'use strict'

    var TE  = (function() {
        
        var TE = function() {}

        // 用于关联selector与图表对象
        var chartMap = []

        // find用于读取chartMap中的对象
        var find = function(selector) {

            var c = chartMap[selector]

            if (typeof c === 'undefined') {

                c = chartMap[selector] = {}
                
            }

            return c
        }

        TE.fn = TE.prototype = {
            constructor: TE,
            // 一堆原型属性和方法
        }

        TE.extend = TE.fn.extend = function() {

            for (var key in arguments[0]) {

                TE[key] = arguments[0][key]
            }
        }

        TE.extend({
            find: find
        })

        return TE
    })()

    window.TE = window.T = TE

})(window)

