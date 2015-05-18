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
				obj = chart.obj
				svg = obj.svg

			var xScale = axis.scale('ordinal')
					.domain(data)
					.rangeBands([0, obj.width], 0.1)


			axis.create('xAxis', xScale, d3.select(svg), data, [1, 1], [1, 1])
		},


		// 原设计：create的时候生成一个svg当做容器，bind的时候再剪切到目标svg
		// type, scale, svg, position, tickValues, transform
		// 
		// 
		create: function(type, scale, svg, tickValues, position, transform) {


			// var xScale = d3.scale.ordinal()
			// 			   .domain(d3.range(dataset.length))
			// 			   .rangeBands([0,width-margin.left-margin.right],0.1);
			// var yScale = d3.scale.linear()
			// 			   .domain([0,d3.max(dataset)])
			// 			   .range([height-margin.top-margin.bottom,0]);


			console.log('translate(' + transform[0] + ',' + transform[1] + ')')

			console.log(tickValues)


			var axis = d3.svg.axis()
				.scale(scale)
				.orient(position)
				.tickValues(tickValues)

			svg.append('g')
				.attr('class', type)
				.attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')')
				.call(axis)

			// svg.selectAll('.tick line').attr(this.axisStyle)
			// svg.selectAll('.tick text').attr(this.textStyle)
			// svg.selectAll('.xAxis path').attr(this.axisStyle)
			// svg.selectAll('.yAxis path').attr(this.axisStyle)
		},

		bind: function() {

			console.log('bind used')
		},

		unbind: function() {},

		update: function(type, scale, position, tickValues, transform) {

			var axis = d3.svg.axis()
				.scale(scale)
				.orient(position)
				.tickValues(tickValues)

			this.svg.select('.' + type)
				.transition()
				.duration(this.animate)
				.call(axis)
		}
	}

	return axis
})