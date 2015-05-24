/**
 * @description 条形图的绘制
 * @dete 2015.04.28
 * @version 0.0.1
 */

function lengthBar(svg, data) {

    this.svg = svg
    this.data = data
    this.config = null

    var that = this

    this.draw = function() {

        var config = that.config

        var svgClientRect = that.svg.getBoundingClientRect()
        var svg = d3.select(that.svg)

        svg.attr('version', '1.1')
        svg.attr('xmlns', 'http://www.w3.org/1999/svg')

        svg.attr('width', config.width)
            .attr('height', config.height)

        // TODO: magic number
        var paddingLeft = config.paddingLeft,
            paddingBottom = config.paddingBottom,
            paddingTop = config.paddingTop,
            paddingRight = config.paddingRight

        var color = d3.scale.category10()

        // TODO: 上面可以封装成函数，用于计算每行数据的和
        // TODO: 两侧的padding都是magic number   
        var xScale = d3.scale.ordinal()
            .domain(config.scale.x.data)
            .rangeBands([0, config.width - config.paddingLeft - config.paddingRight], 0.1)

        var yScale = d3.scale.linear()
            .domain([0, d3.max(that.data)])
            .range([0, config.height - config.paddingTop - config.paddingBottom])

        svg.append('g')
            .attr('class', 'chart')
            .attr('transform', 'translate(' + paddingLeft + ',' + paddingTop + ')')
            .selectAll('rect')
            .data(that.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('width', xScale.rangeBand())
            .attr('height', function(d, i) {
                return yScale(d)
            })
            .attr('y', function(d, i) {

                return config.height  - paddingBottom - paddingBottom- yScale(d)
                //return screen.availHeight - paddingBottom
            })
            .attr('x', function(d, i) {

                return xScale(config.scale.x.data[i])
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

    return that
}

/**
 * 2015.5.22
 * 增加了y轴比例尺
 * 样式从config中读取
 */