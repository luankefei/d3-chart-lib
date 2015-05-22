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

	init: function(chart) {

		// TODO: 不优雅的设计，重写config
		var config = chart.config
		var axis = Component.Axis

		var data = chart.data,
			svg = chart.svg

		var xScale = axis.scale('ordinal')
				.domain(config.scale.x.data)
				.rangeBands([0, config.width - config.paddingLeft - config.paddingRight], 0.1)

		var yScale = d3.scale.linear()
				.domain([0,d3.max(data)])
			   	.range([config.height - config.paddingTop - config.paddingBottom, 0])

		axis.create('xAxis', xScale, d3.select(svg), config.scale.x.data, 'bottom', [ config.paddingLeft, config.height - config.paddingBottom ], config)
		axis.create('yAxis', yScale, d3.select(svg), null, 'left', [ config.paddingLeft, config.paddingTop ], config)
	},


	// 原设计：create的时候生成一个svg当做容器，bind的时候再剪切到目标svg
	// type, scale, svg, position, tickValues, transform
	//
	//
	create: function(type, scale, svg, data, position, transform, config) {

		config = config.axis

		var axis = d3.svg.axis()
			.scale(scale)
			.orient(position)
			.tickValues(data)

		svg.append('g')
			.attr('class', type + ' component')
			.attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')')
			.call(axis)

		svg.selectAll('.xAxis line').style(config.x.lineStyle)
		svg.selectAll('.xAxis text').style(config.x.textStyle)
		svg.selectAll('.xAxis path').style(config.x.pathStyle)

		svg.selectAll('.yAxis line').style(config.y.lineStyle)
		svg.selectAll('.yAxis text').style(config.y.textStyle)
		svg.selectAll('.yAxis path').style(config.y.pathStyle)

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
 * 移除了init的第二个参数 
 */