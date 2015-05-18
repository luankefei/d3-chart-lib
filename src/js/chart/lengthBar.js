/**
 * @description 条形图的绘制
 * @dete 2015.04.28
 * @version 0.0.1
 */
function lengthBar(svg, data) {

	this.data = data
    this.width = null
    this.height = null
    this.svg = svg

    var that = this

    this.draw = function(self) {

        var svgClientRect = that.svg.getBoundingClientRect()
        var svg = d3.select(that.svg)

        svg.attr('version', '1.1')
        svg.attr('xmlns', 'http://www.w3.org/1999/svg')

        svg.attr('width', that.width)
            .attr('height', that.height)

        // TODO: magic number
        var paddingLeft = 210, 
            paddingBottom = 10

        var color = d3.scale.category10()

        // TODO: 上面可以封装成函数，用于计算每行数据的和
        // TODO: 两侧的padding都是magic number    
        var scale = d3.scale.linear()
            .domain([0, d3.max(that.data)])
            .range([0, 70])

        // 添加立柱
        svg.selectAll('rect')
            .data(that.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('width', 10)
            .attr('height', function(d, i) {

                return scale(d)
            })
            .attr('y', function(d, i) {

                return svgClientRect.height - scale(d) - paddingBottom
                //return screen.availHeight - paddingBottom
            })
            .attr('x', function(d, i) {

                return that.width / that.data.length * i
            })
            .attr('fill', function(d, i) {

                return color(i)
            })
            .attr('data-sarial', function(d, i) {

                return i
            })
            .attr('data-d', function(d, i) {

                return d
            })

        // // 添加说明文本
        // svg.selectAll('text')
        //     .data(dataset.keys)
        //     .enter()
        //     .append('text')
        //     .text(function(d, i) {
        //         return d
        //     })
        //     .attr('x', function(d, i) {

        //         return width / rectValues.length * i - 4
        //     })
        //     .attr('y', function(d, i) {

        //         return 840
        //     })
        //     .attr('transform', function(d, i) {

        //         var x = paddingLeft + width / rectValues.length * i

        //         return 'rotate(90, ' + x + ', 840)'
        //     })
        //     .attr('class', 'text')
    }

    return this
}
