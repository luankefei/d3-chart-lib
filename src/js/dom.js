
'use strict'


Y.define('dom', [], function() {

    var http = Y.use('http')

    var dom = {

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

            http.loadResource(src, function(data) {

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

                http.loadResource(src, function(data) {

                    callback && callback(data)
                })  
            }
        },

        // 获取默认交互事件
        getInteractive: function(node) {

            var nodeAct = node.getElementsByTagName('interactive')[0]
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
        }
    }

    return dom
})