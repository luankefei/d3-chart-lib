
/**
 * @description 组件入口
 * @date 2015.5.18
 */

var Component = {}

Component.init = function(components, data, selector, config) {

    if (components === null || components === undefined) {

        return
    }

    // components可能是多个
    for (var i = 0; i < components.length; i++) {

        var name = components[i]['name']

        // TODO: 首字母大写，似乎是hack，应该可以在config里约定
        var key = name[0].toUpperCase() + name.substring(1)

        var cop = Component[key]
        var chart = Y.find(selector)

        cop.init(chart, config[name])

    }
}

/**
 * 2015.5.19 
 * 取消了setTimeout，组件代码将随组件库一同打包
 * 修改了init函数，第三个参数从node替换成selector
 * 2015.5.22
 * 添加了多标签支持
 * 修改了init方法，对参数进行验证
 */