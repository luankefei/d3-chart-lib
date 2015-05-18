
/**
 * @name chart.js
 * @description 根据name来加载绘图文件，并执行draw方法
 */

'use strict'

Y.define('chart', [], function() {

    var http = Y.use('http')

    var chart = {

        draw: function(name, svg, data) {

            var url = './js/chart/' + name + '.js'

            http.getScript(url, function() {

                var style = getComputedStyle(svg)
                
                // TODO: 去掉eval
                var c = eval('new ' + name + '(svg, data)')
                // selector将作为chartMap中的key值，暂时使用用户定义的id
                var id = svg.getAttribute('id')
                var self = Y.find('#' + id)

                // TODO: selector暂时使用id代替
                self.chart = {
                    selector: id,
                    name: name,
                    obj: c
                }

                c.id = id
                c.width = style.width
                c.height = style.height

                c.width = c.width.substring(0, c.width.length - 2)
                c.height = c.height.substring(0, c.height.length - 2)

                c.draw()

                // 绑定事件
                Y.bindEvent(self)
            })
        }
    }

    return chart
})
