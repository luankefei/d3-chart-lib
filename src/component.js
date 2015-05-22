
/**
 * @description 组件入口
 * @date 2015.5.18
 */

var Component = {}

Component.init = function(obj, data, selector, config) {

	var name = obj['name']

    // TODO: 首字母大写，似乎是hack，应该可以在config里约定
    var key = name[0].toUpperCase() + name.substring(1)

	var cop = Component[key]
	var chart = Y.find(selector)

	cop.init(chart, config[name])
}

/**
 * 2015.5.19 
 * 取消了setTimeout，组件代码将随组件库一同打包
 * 修改了init函数，第三个参数从node替换成selector
 */