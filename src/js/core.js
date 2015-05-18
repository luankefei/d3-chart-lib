
'use strict'

/**
 * 绘图功能的入口模块
 * @name core
 */
Y.define('core', [], function() {

    var dom = Y.use('dom')
    var chart = Y.use('chart')
    var interactive = Y.use('interactive')
    var component = Y.use('component')

    var core = {

        init: function(node) {

            var data = dom.getData(node, function(data) {

                var svg = dom.replaceDom(node)
                var name = node.getAttribute('data-name')
                var act = dom.getInteractive(node)
                var components = dom.getComponent(node)

                // 加载config文件，进行绘图
                dom.getConfig(node, function(config) {

                    // 初始化事件
                    act = interactive.init(act)

                    // 绑定事件，与用户扩展事件逻辑一致
                    act.bind(node)

                    // 绘图
                    chart.draw(name, svg, data, config)

                    // 初始化组件
                    // TODO: 这里只对组件1进行处理
                    components[0] = component.init(components[0], data, node)
                })
            })
        }   // end function -> init
    }
    
    return core
})
