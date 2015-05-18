
'use strict'


Y.define('dom', [], function() {

    var http = Y.use('http')

    var dom = {

        replaceDom: function(ele) {

            var id = ele.getAttribute('id'),
                clas = ele.getAttribute('class'),
                type = ele.getAttribute('data-type')

            var newEle = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

            newEle.setAttribute('id', id)
            newEle.setAttribute('class', clas)
            newEle.setAttribute('data-type', type)

            document.getElementsByTagName('body')[0].appendChild(newEle)

            ele.parentNode.replaceChild(newEle, ele)

            return newEle
        },

        // config只支持src
        getConfig: function(ele, callback) {

            var eleConfig = ele.getElementsByTagName('config')[0]
            var src = eleConfig.getAttribute('src')

            http.loadResource(src, function(data) {

                callback && callback(data)
            })
        },

        // data支持src和innerHTML两种形式
        getData: function(ele, callback) {

            var eleData = ele.getElementsByTagName('data')[0]
            var src = eleData.getAttribute('src')
            var data = null

            if (src == null) {

                data = eval(eleData.innerHTML)

                callback && callback(data)

            } else {

                http.loadResource(src, function(data) {

                    callback && callback(data)
                })  
            }
        },

        // 获取默认交互事件
        getInteractive: function(ele) {

            var eleAct = ele.getElementsByTagName('interactive')[0]
            var act = {}

            if (typeof eleAct === 'undefined') {

                act = null
            
            } else {

                act.trigger = eleAct.getAttribute('data-trigger')
                act.name = eleAct.getAttribute('data-name')
                act.target = eleAct.getAttribute('data-target'),
                act.type = eleAct.getAttribute('data-type')
            }

            return act
        }
    }

    return dom
})