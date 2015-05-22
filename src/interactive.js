
'use strict'


/**
 * @description 此文件提供默认的交互方式，用户可以通过chartMap重写交互事件
 * @dete 2015.04.28
 * @version  0.0.1
 */
function interactive() {

    this.trigger = null
    this.name = null
    this.type = null
    this.target = null

    this.bind = function(dom) {

        // TODO: 这里为了方便，后面要改成selector
        var id = dom.getAttribute('id')
        var chart = Y.find('#' + id, dom)
        
        // TODO: 这里代码太乱
        // 如果图表下面的trigger对象不存在，直接注册
        if (typeof chart['part'][this.trigger] === 'undefined') {
            chart['part'][this.trigger] = []
        }

        // 将事件声明到trigger对象内
        chart['part'][this.trigger].push({

            name: this.name,
            target: this.target,
            func: this.type
        })

        // 取消了事件绑定，bind函数只用来声明事件
        //active.bindEvent(chart, dom)
    }
}

var Interactive = {

    init: function(act, dom) {

        if (act === null || act === undefined) {

            return
        }

        // act可能是多个
        var objs = []

        for (var i = 0; i < act.length; i++) {

            var obj = new interactive()

            obj.trigger = act[i].trigger
            obj.name = act[i].name
            obj.type = act[i].type
            obj.target = act[i].target

            obj.bind(dom)
        }

        //return objs
    },

    /**
     * 通用的事件绑定方法，传入图表对象，函数将遍历该对象注册的所有事件进行绑定
     * @param  {object} chart
     * @return {boolean}
     */
    bindEvent: function(chart) {

        var parts = chart['part']
        var partNames = []

        for (var k in parts) {

            partNames.push(k)
        }

        // 注册事件
        // TODO: 这里代码更乱
        for (var i = 0; i < partNames.length; i++) {

            var part = partNames[i]
            // TODO: 可优化，在绘图时将dom对象进行保存
            // TODO: 这里通过id获取，以后替换成selector
            var selector = '#' + chart['chart']['selector'] + ' .' + part
            var eventList = parts[partNames[i]]

            for (var j = 0; j < eventList.length; j++) {

                var eve = eventList[j]
                var doms = document.querySelectorAll(selector)

                for (var k = 0; k < doms.length; k++) {

                    var func = eve.func

                    if (typeof eve.func === 'string') {

                        func = Events[eve.func]
                    }

                    doms[k].addEventListener(eve.name, func, false)
                }
            }
        }

        return true
    }
}

/**
 * 2015.5.19 修改了bind方法，调用Y.find时传入了第二个参数dom，如果没有用户事件，这里应该是第一次调用Y.find
 * 2015.5.22 
 * 修改了事件绑定流程，init会自动调用bind方法
 * 添加了init方法的多标签支持
 * 修改了init方法，对参数进行验证
 * 
 */