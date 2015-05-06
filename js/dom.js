
'use strict'


define('dom', [], function() {

    var http = T.use('http')

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

        getData: function(ele, callback) {

            var eleData = ele.getElementsByTagName('data')[0]
            var src = eleData.getAttribute('src')
            var data = null

            if (src == null) {

                data = eleData.innerHTML

                callback && callback(data)

            } else {

                http.loadResource(src, function(data) {

                    callback && callback(data)
                })  
            }
        }
    }

    return dom
})