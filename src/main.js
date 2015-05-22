
/**
 * @name  main.js
 * @description  此文件是种子模块，描述整体结构，提供extend等基础api
 * @date  2015.05.07
 * @version  0.0.2
 */

var version = 1                 // 版本号
var chartMap = []               // 用于关联selector与图表对象

var moduleMap = {}              // 用于amd模块
var fileMap = {}                // 用于amd模块

var noop = function () {}       // 用于amd模块



// 根据data/struct.js 初始化图表结构
var initStruct = function(selector, key) {   

    // 判断第二个参数是否是domNode
    if (key.nodeName !== undefined) {

        key = key.getAttribute('data-name')

    }

    chartMap[selector] = Y.struct[key]

    return chartMap[selector]
}

var Y  = (function() {
    
    var Y = {}

    Y.extend = function() {

        for (var key in arguments[0]) {

            Y[key] = arguments[0][key]
        }
    }

    return Y
})()

Y.extend({

    Ycharts: version,

    // find用于读取chartMap中的对象
    find: function(selector, node) {

        var c = chartMap[selector]

        if (typeof c === 'undefined') {

            c = initStruct(selector, node)
        }

        return c
    },

    // 注册事件
    addEvent: function(target, handler) {

        //target['part'][handler.part] = []
        target['part'][handler.part].push({

            name: handler.name,
            type: handler.type,
            func: handler.func
        })
    },

    // TODO: 移除事件
    removeEvent: function() {}
})




/**
 * 2015.5.11 整合了原有的module.js模块，使框架结构更清晰
 * 2015.5.18 修改了find函数，该函数将生成更为详细的数据结构
 * 2015.5.19 
 * 修改了find函数，增加了第二个参数node。将初始化结构的代码分离到initStruct中
 * 增加了initStruct函数，该函数负责按照data/struct.js文件生成图表对象的数据结构
 * 增加了addEvent函数，负责绑定事件
 * 增加了removeEvent函数，该函数尚未完成
 */

