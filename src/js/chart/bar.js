
T.define('bar', [], function() {

	var YConfig = T.use('config')

	YConfig.bar =  {
		margin: {
			top: 10,
			right: 10,
			bottom: 20,
			left: 20
		}

	}

	function Bar() {

	}

    return Bar
})