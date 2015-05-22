
/**
 * 默认事件模块，内含所有交互函数
 * @dete 2015.5.18
 */

var Events = {}

Events.highlight = function(e) {

    e.target.style.opacity = '0.6'
}

Events.resetHighlight = function(e) {

    e.target.style.opacity = 1
}


/**
 * 2015.5.22 添加了resetHighlight
 */