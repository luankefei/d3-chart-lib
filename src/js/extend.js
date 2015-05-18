
/**
 * 负责暴露api到全局对象上
 * @name extend
 */

(function(Y) {

    var core = Y.use('core'),
        http = Y.use('http'),
        interactive = Y.use('interactive')

    Y.extend({

        init: core.init,
        getScript: http.getScript,
        getJson: http.getJson,
        bindEvent: interactive.bindEvent
    })

})(Ycharts)

/**
 * 2015.5.18 增加了bindEvent
 */