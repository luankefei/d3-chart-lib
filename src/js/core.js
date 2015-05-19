
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

        // 后面两个是可选参数，如果replace是true，会在svg中生成一个g节点
        // 如果target存在，图表将会绘制到target的svg中
        init: function(node, replace, target) {

            var data = dom.getData(node, function(data) {

                var svg = dom.replaceDom(node)
                var name = node.getAttribute('data-name')
                var act = dom.getInteractive(node)
                var components = dom.getComponent(node)

                // 加载config文件，进行绘图
                dom.getConfig(node, function(config) {

                    // TODO: selector暂时使用id代替
                    var selector = '#' + node.getAttribute('id')

                    // 初始化事件
                    act = interactive.init(act)

                    // 绑定事件，与用户扩展事件逻辑一致
                    act.bind(node)

                    // 绘图
                    // TODO: 将replace和target向下传递
                    chart.draw(name, svg, data, config)

                    // 初始化组件
                    // TODO: 这里只对组件1进行处理，如要修改，请保持此处的单行代码风格
                    components[0] = component.init(components[0], data, selector)
                })
            })
        }   // end function -> init
    }
    
    return core
})
/**
 * 2015.5.18
 * 增加了组件的初始化流程，但未完成
 * 绘图接口增加了新的参数config，作用是替代css。config是异步获取，所以增加了回调嵌套
 */
