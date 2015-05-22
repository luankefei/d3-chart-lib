

/**
 * @name  axis.js
 * @description 数轴组件
 * @date 2015.5.18
 */

Component.Axis = {

	config: null,
	//self: Component.Axis,

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

	init: function(chart, config) {

		this.config = config

		var chart = chart['chart']
		var axis = Component.Axis

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
		// svg.selectAll('.tick line').attr(this.axisStyle)
		// svg.selectAll('.tick text').attr(this.textStyle)
		// svg.selectAll('.xAxis path').attr(this.axisStyle)
		// svg.selectAll('.yAxis path').attr(this.axisStyle)
		// 
		svg.selectAll('.xAxis line').style(this.config.x.lineStyle)
		svg.selectAll('.xAxis text').style(this.config.x.textStyle)
		svg.selectAll('.xAxis path').style(this.config.x.pathStyle)

		svg.selectAll('.yAxis line').style(this.config.x.lineStyle)
		svg.selectAll('.yAxis text').style(this.config.x.textStyle)
		svg.selectAll('.yAxis path').style(this.config.x.pathStyle)

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
/**
 * 2015.5.18 
 * 调整了组件结构，但尚不完善。oop可能更有表现力。
 * 增加了init函数，该函数将作为组件入口。负责获取绘图所需参数
 * 2015.5.22
 * 增加了对config的调用
 */


