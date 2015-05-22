
/**
 * @name chart.js
 * @description 根据name来加载绘图文件，并执行draw方法
 */

var Chart = {

    draw: function(name, svg, data, config) {

        // TODO: 这里传入了data，导致下面的self.chart.data无效
        var c = eval('new ' + name + '(svg, data)')

        // TODO: selector将作为chartMap中的key值，暂时使用用户定义的id
        var id = svg.getAttribute('id')
        var self = Y.find('#' + id, name)

        self.config = c.config = config
        self.svg = svg
        self.data = data
        self.name = name
        // TODO: selector暂时使用id代替
        self.selector = '#' + id

        // 将所有config绑定到图表对象上
        // for (var k in config) {
    
        //     if (k != 'data') {
        //         c[k] = config[k]
        //     }
        // }
      
        console.log('chart find')
        c.draw()

        // 绑定事件
        Y.bindEvent(self)
    }
}
/**
 * 2015.5.18
 * 放弃了原使用css的设计，样式改从config中读取
 * 绘图后会进行事件绑定
 * 取消了http加载，所有图表文件将与组件库一同打包
 */
