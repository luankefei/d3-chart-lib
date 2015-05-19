

'use strict'


/**
 * @description 组件入口
 * @date 2015.5.18
 */
Y.define('component', [], function(data) {

	var http = Y.use('http')
	var component = {}

	component.init = function(obj, data, selector) {

		var name = obj['name']

		var cop = Y.use(name)
		var chart = Y.find(selector)

		cop.init(chart)
	}

	return component
})

/**
 * 2015.5.19 
 * 取消了setTimeout，组件代码将随组件库一同打包
 * 修改了init函数，第三个参数从node替换成selector
 */