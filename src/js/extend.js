
/**
 * 负责暴露api到全局对象上
 * @name extend
 */

(function(TE) {

    var core = TE.use('core'),
        http = TE.use('http')

    TE.extend({

        init: core.init,
        getScript: http.getScript,
        getJson: http.getJson,
    })

})(TE)