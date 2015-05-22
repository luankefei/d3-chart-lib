

/**
 * @description  数据交互模块，处理请求
 * @name  http.js
 */

var Http = {

    // 现有设计会污染window对象，尽量不要使用异步加载
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
                Http.getJson(url, callback)

                break

            case 'js':
                Http.getScript(url, callback)

                break

            default:
                break
        }
    }
}


