

'use strict'


/**
 * @description 组件入口
 * @date 2015.5.18
 * 
 */
Y.define('component', [], function(data) {

	var http = Y.use('http')
	var component = {}

	component.init = function(obj, data, node) {

		var name = obj['name']

		// TODO: 测试用的setTimeout
		setTimeout(function() {

			var cop = Y.use(name)
			var id = node.getAttribute('id')
			var chart = Y.find('#' + id)

			cop.init(chart)

		}, 1000)

			//cop.bind(chart)
			// 创建组件
			
			// TODO: 这里的id要替换成selector
			
			

			// TODO: setTimeout只在测试时使用
			// 
			// setTimeout(function() {

			// 	var svg = chart['chart']['svg']

			// 	cop.create('xAxis', scaleX, svg)

			// }, 1000)

			// type, scale, chart, position, tickValues, transform
	}
	
	return component
})