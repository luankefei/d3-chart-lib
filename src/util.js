'use strict'


/**
 * 工具模块，定义了大量工具函数，多为组件库内部使用
 * @name  util.js
 */


var Util = {}

Util.getColors = function(colors, number) {

    var colorset = [],
        color,
        i,
        hsl

    for (i = 0; i < number; i++) {

        ///这样定义的随机色的亮度和饱和度会固定，随机色的颜色也会比较的好看
        hsl = 'hsl(' + Math.random() * 1000 + ', 70%, 60%)'
        color = d3.hsl(hsl).rgb().toString()
        colorset.push(color)
    }

    return colors.concat(colorset)
}
Util.clone = function (obj) {

    var newObj


    switch (typeof obj ) {

        case 'undefined':

            break

        case 'string':
        case 'boolean':
        case 'number':
        case 'function':

            newObj = obj
            break

        case 'object':

            if (obj === null) {

                newObj = obj = null

            } else if (Array.isArray(obj)) {

                newObj = []

                for (var i = 0 ; i < obj.length; i++) {

                    newObj.push(Util.clone(obj[i]))

                }

            } else {

                newObj = {}

                for (var key in obj) {

                    newObj[key] = Util.clone(obj[key])

                }
            }

        break

        default:

            newObj = obj

        break
    }

    return newObj

}