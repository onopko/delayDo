# delayDo [![Build Status](https://secure.travis-ci.org/onopko/delayDo.svg?branch=master)](https://travis-ci.org/onopko/delayDo) ![Bower Version](https://badge.fury.io/bo/delay-do.svg)

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/delayDo.min.js"></script>
	```

3. Call the plugin and add functions to specific timer:

	```javascript
	$.delayDo('timerId', function () {
		// do something.
	});
	```

4. Resume timer:

	```javascript
	$.delayDo.resume({
		timerId: 'timerId',
		interval: 200,
		complete: function () {
			// do something.
		}
	});
	```

## Contributing

Check [CONTRIBUTING.md](https://github.com/onopko/delayDo/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/onopko/delayDo/releases) for detailed changelog.

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
