
'use strict'


define('core', [], function() {

    var dom = T.use('dom')
    var chart = T.use('chart')

    var core = {

        init: function(ele) {

            var data = dom.getData(ele, function(data) {

                //var interactive = getAct(ele)
            
                var svg = dom.replaceDom(ele)
                var name = ele.getAttribute('data-name')
                
                chart.draw(name, svg, data)
                //initChart(svg, data)
            })
        }
    }

    T.init = core.init
    
    return core
})
