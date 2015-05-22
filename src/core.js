

/**
 * 绘图功能的入口模块
 * @name core
 */


var Core = {

    // 后面两个是可选参数，如果replace是true，会在svg中生成一个g节点
    // 如果target存在，图表将会绘制到target的svg中
    init: function(node, replace, target) {

        var data = Dom.getData(node, function(data) {

            var svg = Dom.replaceDom(node)
            var name = node.getAttribute('data-name')
            var act = Dom.getEvent(node)
            var components = Dom.getComponent(node)

            // 加载config文件，进行绘图
            Dom.getConfig(node, function(config) {

                // TODO: selector暂时使用id代替
                var selector = '#' + node.getAttribute('id')

                // 存在验证
                if (act !== null) {

                    // 初始化事件
                    act = Interactive.init(act)

                    // 绑定事件，与用户扩展事件逻辑一致
                    act.bind(node)
                }

                // 绘图
                // TODO: 将replace和target向下传递
                Chart.draw(name, svg, data, config)

                if (components !== null) {

                    // 初始化组件
                    // TODO: 这里只对组件1进行处理，如要修改，请保持此处的单行代码风格
                    components[0] = Component.init(components[0], data, selector, config)
        
                }
            })
        })
    }
}

/**
 * 2015.5.18
 * 增加了组件的初始化流程，但未完成
 * 绘图接口增加了新的参数config，作用是替代css。config是异步获取，所以增加了回调嵌套
 * 2015.5.22
 * 更新了对Dom模块事件接口的调用函数
 * 增加了对event和component两个可选参数的存在验证，但代码风格糟糕，需要改进
 */
