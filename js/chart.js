
/**
 * @name chart
 * @description 根据name来加载绘图文件，并执行draw方法
 */

'use strict'

define('chart', [], function() {

    var http = T.use('http')

    var chart = {

        draw: function(name, svg, data) {

            var url = './js/chart/' + name + '.js'

            http.getScript(url, function() {

                var style = getComputedStyle(svg)
                
                // todo: 去掉eval
                var map = eval('new ' + name + '(svg, data)')

                map.width = style.width
                map.height = style.height

                map.width = map.width.substring(0, map.width.length - 2)
                map.height = map.height.substring(0, map.height.length - 2)

                map.draw()
            })
        }
    }

    return chart
})
