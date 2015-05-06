
'use strict'


define('promise', ['http'], function(http) {

    var current = null

    var promise = {

        // do: function(func) {

        //     func && func()

        //     return promise
        // },


        defer: function(url) {

            current = url

            http.getScript(url, function() {

                current = null
            })

            return promise
        },

        then: function(url) {

            var wait = setInterval(function() {

                if (current == null) {

                    clearInterval(wait)

                    promise.defer(url)
                }

            }, 300)

            return promise
        },

        end: function(callback) {

            var wait = setInterval(function() {

                if (current == null) {

                    clearInterval(wait)

                    callback && callback()
                }

            }, 300)
        }
    }

    return promise
})



