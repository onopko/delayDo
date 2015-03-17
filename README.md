# delayDo [![Build Status](https://secure.travis-ci.org/onopko/delayDo.svg?branch=master)](https://travis-ci.org/onopko/delayDo) ![Bower Version](https://badge.fury.io/bo/delay-do.svg)

delayDo is a tiny jQuery plugin. It enables you to create a specific timer which contains some functions as a queue and can resume it later.
Also delayDo is friendly for modern browsers. Its delay method uses requestAnimationFrame() and Performance.now() instead of setTimeout() and Date.now().

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/delayDo.min.js"></script>
	```

3. Create a timer (just name specific timer id) and add functions to its queue:

	```javascript
	$.delayDo('timerId', function () {
		// do something.
	});
	```

4. Resume the timer. It calls a function from the queue one by one at regular intervals:

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

The MIT License ([MIT](http://www.opensource.org/licenses/mit-license.php))

Copyright © 2015 Takehiko Ono <me@onotakehiko.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
