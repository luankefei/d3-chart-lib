
'use strict'

/**
 * 绘图功能的入口模块
 * @name core
 */
Y.define('core', [], function() {

    var dom = Y.use('dom')
    var chart = Y.use('chart')
    var interactive = Y.use('interactive')

    var core = {

        init: function(ele) {

            var data = dom.getData(ele, function(data) {

                var svg = dom.replaceDom(ele)
                var name = ele.getAttribute('data-name')
                var act = dom.getInteractive(ele)

                // 加载config文件，进行绘图
                dom.getConfig(ele, function(config) {

                    // 初始化事件
                    act = interactive.init(act)

                    // 绑定事件，与用户扩展事件逻辑一致
                    act.bind(ele)

                    chart.draw(name, svg, data)

                })
            })
        }
    }
    
    return core
})
