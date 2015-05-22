

/**
 * dom模块负责解析html代码
 * @name dom.js
 * @date 2015.5.9
 */

var Dom = {

    replaceDom: function(node) {

        var id = node.getAttribute('id'),
            clas = node.getAttribute('class'),
            type = node.getAttribute('data-type')

        var newEle = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

        newEle.setAttribute('id', id)
        newEle.setAttribute('class', clas)
        newEle.setAttribute('data-type', type)

        document.getElementsByTagName('body')[0].appendChild(newEle)

        node.parentNode.replaceChild(newEle, node)

        return newEle
    },

    // config只支持src
    getConfig: function(node, callback) {

        var nodeConfig = node.getElementsByTagName('config')[0]
        var src = nodeConfig.getAttribute('src')

        Http.loadResource(src, function(data) {

            callback && callback(data)
        })
    },

    // data支持src和innerHTML两种形式
    getData: function(node, callback) {

        var nodeData = node.getElementsByTagName('data')[0]
        var src = nodeData.getAttribute('src')
        var data = null

        if (src == null) {

            data = eval(nodeData.innerHTML)

            callback && callback(data)

        } else {

            Http.loadResource(src, function(data) {

                callback && callback(data)
            })  
        }
    },

    // 获取默认交互事件
    getEvent: function(node) {

        // TODO: 事件可能有多个
        var nodeAct = node.getElementsByTagName('event')[0]
        var act = {}

        if (typeof nodeAct === 'undefined') {

            act = null
        
        } else {

            act.trigger = nodeAct.getAttribute('data-trigger')
            act.name = nodeAct.getAttribute('data-name')
            act.target = nodeAct.getAttribute('data-target'),
            act.type = nodeAct.getAttribute('data-type')
        }

        return act
    },

    // 获取组件
    getComponent: function(node) {

        // 组件可能有多个
        var doms = node.getElementsByTagName('component')
        var components = []

        for (var i = 0; i < doms.length; i++) {

            var c = {}

            c.name = doms[i].getAttribute('data-name')

            components.push(c)
        }

        return components.length === 0 ? null : components
    }   
}

/**
 * 2015.5.18
 * 增加了getComponent函数，该函数用来解析组件标签
 * 修改了getInteractive函数，但未完成，该函数应该可以处理多个事件
 * 增加了getConfig函数，该函数用来解析图表样式
 * 2015.5.22
 * 重命名 getInteractive - > getEvent
 */
