
'use strict'

/**
 * 数据交互模块，处理请求
 * @name  http.js
 */
Y.define('http', [], function() {

    var http = {

        // 通过私有定义的方法是模块和Y对象共有的
        // TODO: 现有设计会污染window对象，以后会取消异步加载
        getScript: function(url, callback) {

            var script = document.createElement('script')
            var body = document.getElementsByTagName('body')[0]

            script.src = url
            script.onload = callback

            body.appendChild(script)

            return script
        },

        getJson: function(url, callback) {

            var req = new XMLHttpRequest()

            req.open('GET', url)
            req.onreadystatechange = function() {

                if (req.status == 200 && req.readyState == 4) {

                    var data = JSON.parse(req.responseText)

                    callback && callback(data)
                }
            }

            req.setRequestHeader('Content-Type', 'application/json')
            req.send(null)
        },

        loadResource: function(url, callback) {

            var type = url.substring(url.lastIndexOf('.') + 1)

            switch (type) {

                case 'json':
                    http.getJson(url, callback)

                    break

                case 'js':
                    http.getScript(url, callback)

                    break

                default:
                    break
            }
        }
    }

    return http
})


