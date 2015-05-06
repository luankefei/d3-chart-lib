

(function(window, undefined) {

    'use strict'

    var TE  = (function() {
        
        var TE = function() {

        }

        // 一堆私有属性和方法
        var load = function() {
            console.log('ddd')
        }

        TE.fn = TE.prototype = {
            constructor: TE,
            init: function() {

            }
            // 一堆原型属性和方法
        }

        TE.extend = TE.fn.extend = function() {

            for (var key in arguments[0]) {

                TE[key] = arguments[0][key]
            }
        }

        return TE
    })()

    window.TE = window.T = TE

})(window)

