T.define('axis', [], function(data) {

	var defaults = {

	}

	function axis() {

		create: function(type, scale, position, tickValues, transform) {

			var axis = d3.svg.axis()
				.scale(scale)
				.orient(position)
				.tickValues(tickValues)

			this.svg.append('g')
				.attr('class', type)
				.attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')')
				.call(axis)

			this.svg.selectAll(".tick line").attr(this.axisStyle)
			this.svg.selectAll(".tick text").attr(this.textStyle)
			this.svg.selectAll(".xAxis path").attr(this.axisStyle)
			this.svg.selectAll(".yAxis path").attr(this.axisStyle)

		},

		bind: function() {},

		unbind: function() {},

		update: function(type, scale, position, tickValues, transform) {

			var axis = d3.svg.axis()
				.scale(scale)
				.orient(position)
				.tickValues(tickValues)

			this.svg.select("." + type)
				.transition()
				.duration(this.animate)
				.call(axis)
		}
	}

	return axis
})