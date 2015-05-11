
'use strict'


TE.define('core', [], function() {

    var dom = T.use('dom')
    var chart = T.use('chart')
    var interactive = T.use('interactive')

    var core = {

        init: function(ele) {

            var data = dom.getData(ele, function(data) {

                var svg = dom.replaceDom(ele)
                var name = ele.getAttribute('data-name')
                var act = dom.getInteractive(ele)

                interactive.init(act)

                chart.draw(name, svg, data)
            })
        }
    }
    
    return core
})
