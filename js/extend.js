(function(TE) {

    var core = TE.use('core'),
        http = TE.use('http')

    TE.extend({

        init: core.init,
        getScript: http.getScript,
        getJson: http.getJson,
    })

})(TE)