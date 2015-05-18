
'use strict'


/**
 * @description 此文件提供默认的交互方式，用户可以通过chartMap重写交互事件
 * @dete 2015.04.28
 * @version  0.0.1
 */
Y.define('interactive', [], function() {

    var http = Y.use('http'),
        evetns = Y.use('events')

    function interactive() {

        this.trigger = null
        this.name = null
        this.type = null
        this.target = null

        this.bind = function(dom) {

            // TODO: 这里为了方便，后面要改成selector
            var chart = Y.find('#' + id)
            var id = dom.getAttribute('id')

            var act = { 

                trigger: this.trigger,
                name: this.name,
                type: this.type,
                target: this.target
            } 

            // TODO: 这里代码太乱

            // 如果图表下面的trigger对象不存在，直接注册
            if (typeof chart['part'][act.trigger] === 'undefined') {
                chart['part'][act.trigger] = []
            }

            // 将事件声明到trigger对象内
            chart['part'][act.trigger].push({

                name: act.name,
                target: act.target,
                func: act.type
            })

            //active.bindEvent(chart, dom)
        }
    }

    var active = {

        init: function(act, dom) {

            var obj = new interactive()

            obj.trigger = act.trigger
            obj.name = act.name
            obj.type = act.type
            obj.target = act.target

            return obj
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

                        //var url = './js/interactive/' + eve.func + '.js
                        doms[k].addEventListener(eve.name, events[eve.type], false)
                    }
                }
            }

            return true
        }
    }

    return active
})