var drawlengthBar = function() {

	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var xScale_data = [];
	that.dataset.forEach(function(d, i) {
		xScale_data.push(d[0]);
	})

	var yScale_data = [0, d3.max(that.dataset, function(d) {
		return d[1];
	})]

	var yAscale_data = [d3.max(that.dataset, function(d) {
		return d[1];
	}), 0]

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xScale_data.length),
		"rangeBands", [0, that.width - that.margin.left - that.margin.right], 0.5);

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.yAscale = STH.util.scale(
		"linear", yAscale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.drawAxis("xAxis", that.xScale, "bottom",
		xScale_data, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yAscale, "left",
		null, [that.margin.left, that.margin.top]);

	that.hasAxis()

	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

	var g = content.selectAll("rect")
		.data(that.dataset)
		.enter()

	g.append("rect")
		.attr("x", function(d, i) {
			return that.xScale(i);
		})
		.attr("width", that.xScale.rangeBand())
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
		.attr("y", function(d, i) {
			return that.height - that.margin.bottom - that.margin.top
		})
		.attr("height", function(d, i) {

			return 0;
		})
		.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];

			var textObj = {};

			textObj.parentG = content;

			textObj.x = that.xScale(i)

			textObj.y = that.yAscale(d[1])

			textObj.data = that.dataset[i][1]

			var obj = {
				dom: domObj,
				data: that.dataset[i],
				text: textObj
			}

			STH.util.MY.data(domObj, "data", obj);

			return "mouse-obj";
		})
		.on("mouseover", function(d, i) {

			d3.select(this)
				.attr("opacity", 0.4);

			var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

			that.mouseover(temp);
			/*var obj = $(d3.select(this)[0][0]).data("data-mouse");
			var key = chartJson.data[i]

			mouseEvent.mouseOver(eval(obj));

			mouseLink.mouse(key, chartJson.selector);*/

		})
		.on("mouseout", function() {

			d3.select(this)
				.attr("opacity", 1);
			that.mouseout();
			/*mouseEvent.mouseOut();*/
		})
		.on("click", function(d, i) {
			if (that.linkChart != null && that.linkChart != "undefined") {
				var chart = d3.select(this)[0][0]
				STH.util.clickEvent(chart, that)
			}
		})
		.transition()
		.duration(that.animate)
		.attr("y", function(d, i) {
			return that.yAscale(d[1])
		})
		.attr("height", function(d, i) {

			return that.yScale(d[1])
		});

	that.hasAxis()
	that.hasMessage()	

} //end function

var updatelengthBar = function(type) {

	var that = this
	var rects;
	var xScale_data = [];
	var fontSize = 13;
	var messsage_data = [];
	var node = []
	var content = that.svg.select(".content")


	that.dataset.forEach(function(d, i) {
		xScale_data.push(d[0]);
	})

	that.dataset.forEach(function(d, i) {
		messsage_data.push(d[1]);
		dB = d[1] + ""
	})



	var yScale_data = [0, d3.max(that.dataset, function(d) {
		return d[1];
	})]

	var yAscale_data = [d3.max(that.dataset, function(d) {
		return d[1];
	}), 0]

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xScale_data.length),
		"rangeBands", [0, that.width - that.margin.left - that.margin.right], 0.5);

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.yAscale = STH.util.scale(
		"linear", yAscale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])
	that.updateAxis("xAxis", that.xScale, "bottom",
		xScale_data, [that.margin.left, that.height - that.margin.bottom])

	that.updateAxis("yAxis", that.yAscale, "left",
		null, [that.margin.left, that.margin.top]);


	rects = content.selectAll("rect")
		.data(that.dataset)


	//对应情况分别是 删除图例某一项， 增加图例某一项， 更新时间轴
	

	rects.transition()
		.duration(that.animate)
		.attr("x", function(d, i) {
			return that.xScale(i);
		})
		.attr("y", function(d, i) {
			return that.yAscale(d[1])
		})
		.attr("height", function(d, i) {

			return that.yScale(d[1])
		})
		.attr("width", that.xScale.rangeBand())
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})

	rects.exit()
		.transition()
		.duration(that.animate)
		.attr({
			y: function(d) {
				return that.height - that.margin.top - that.margin.bottom;
			},
			width: 0,
			height: 0,
		})
		.remove();

	rects.enter()	
		.append("rect")
		.attr("x", function(d, i) {			
			return that.xScale(i);
		})
		.attr("y", function(d, i) {
			return that.height - that.margin.top - that.margin.bottom
		})
		.attr("height", function(d, i) {

			return 0
		})
		.attr("width", that.xScale.rangeBand())
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
		.transition()
		.duration(that.animate)
		.attr("x", function(d, i) {
			return that.xScale(i);
		})
		.attr("y", function(d, i) {
			return that.yAscale(d[1])
		})
		.attr("height", function(d, i) {

			return that.yScale(d[1])
		})
		.attr("width", that.xScale.rangeBand())
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})

		rects.call(commonEvent)

		

	function commonEvent() {

		this.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];

				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(i);

				textObj.y = that.yAscale(d[1]);

				textObj.data = that.dataset[i][1]

				var obj = {
					dom: domObj,
					data: that.dataset[i],
					text: textObj
				}

				STH.util.MY.data(domObj, "data", obj);

				return "mouse-obj";
			})
			.on("mouseover", function(d, i) {

				d3.select(this)
					.attr("opacity", 0.4);

				var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

				that.mouseover(temp);
				/*var obj = $(d3.select(this)[0][0]).data("data-mouse");
				var key = chartJson.data[i]

				mouseEvent.mouseOver(eval(obj));

				mouseLink.mouse(key, chartJson.selector);*/

			})
			.on("mouseout", function() {

				d3.select(this)
					.attr("opacity", 1);
				that.mouseout();
				/*mouseEvent.mouseOut();*/
			})
			.on("click", function(d, i) {
				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}
			})
			
	}

	
　　　　that.updateMessage()
　　　　　　
	
}