
'use strict'

/**
 * 默认事件模块，内含所有交互函数
 * @dete 2015.5.18
 */
Y.define('events', [], function() {


    var events = {}

    events.highlight = function(e) {

        console.log('highlight')
        e.target.style.fill = 'white'
    }

    return events
})