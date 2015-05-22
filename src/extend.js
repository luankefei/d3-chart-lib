
/**
 * @description  负责暴露api到全局对象上
 * @name extend
 */


Y.extend({

    init: Core.init,
    changeData: Core.changeData,
    getScript: Http.getScript,
    getJson: Http.getJson,
    bindEvent: Interactive.bindEvent
})

/**
 * 2015.5.18 增加了bindEvent
 */