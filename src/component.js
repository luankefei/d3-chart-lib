
/**
 * @description 组件入口
 * @date 2015.5.18
 */

var Component = {}

Component.init = function(obj, data, selector) {

	var name = obj['name']

    // TODO: 首字母大写，似乎是hack，应该可以在config里约定
    name = name[0].toUpperCase() + name.substring(1)

	var cop = Component[name]
	var chart = Y.find(selector)

	cop.init(chart)
}

/**
 * 2015.5.19 
 * 取消了setTimeout，组件代码将随组件库一同打包
 * 修改了init函数，第三个参数从node替换成selector
 */