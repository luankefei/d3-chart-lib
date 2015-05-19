
'use strict'

/**
 * @name  axis.js
 * @description 数轴组件
 * @date 2015.5.18
 */
Y.define('axis', [], function(data) {

	var axis = {

		scale: function(type) {

			var obj = null

			switch(type) {

				case 'ordinal':
					obj = d3.scale.ordinal()

					break

				case 'linear':
					obj = d3.scale.linear()

					break

				default:
					break
			}

			return obj
		},

		init: function(chart) {

			var chart = chart['chart']

			var data = chart.data,
				obj = chart.obj,
				svg = obj.svg

			var xScale = axis.scale('ordinal')
					.domain(data)
					.rangeBands([0, obj.width], 0.1)

			axis.create('xAxis', xScale, d3.select(svg), data, [1, 1], [1, 1])

			// var yScale = d3.scale.linear()
			// 			   .domain([0,d3.max(dataset)])
			// 			   .range([height-margin.top-margin.bottom,0]);

		},


		// 原设计：create的时候生成一个svg当做容器，bind的时候再剪切到目标svg
		// type, scale, svg, position, tickValues, transform
		//
		//
		create: function(type, scale, svg, data, position, transform) {

			var axis = d3.svg.axis()
				.scale(scale)
				.orient(position)
				.tickValues(data)

			svg.append('g')
				.attr('class', type)
				.attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')')
				.call(axis)

			// TODO: 组件库最好不要整合css
			svg.selectAll('.tick line').attr(this.axisStyle)
			svg.selectAll('.tick text').attr(this.textStyle)
			svg.selectAll('.xAxis path').attr(this.axisStyle)
			svg.selectAll('.yAxis path').attr(this.axisStyle)
		},

		bind: function() {
			console.log('bind used')
		},

		unbind: function() {},

		update: function(type, scale, position, data, transform) {

			var axis = d3.svg.axis()
				.scale(scale)
				.orient(position)
				.tickValues(data)

			this.svg.select('.' + type)
				.transition()
				.duration(this.animate)
				.call(axis)
		}
	}

	return axis
})

/**
 * 2015.5.18
 * 调整了组件结构，但尚不完善。oop可能更有表现力。
 * 增加了init函数，该函数将作为组件入口。负责获取绘图所需参数
 */


