# delayDo [![Build Status](https://secure.travis-ci.org/onopko/delayDo.svg?branch=master)](https://travis-ci.org/onopko/delayDo) ![Bower Version](https://badge.fury.io/bo/delay-do.svg)

delayDo is a tiny jQuery plugin. It enables you to create a specific timer which contains some functions as a queue and can resume it later.

## Demo

[http://onopko.github.io/delayDo/](http://onopko.github.io/delayDo/)


## Usage

1. Include jQuery, <a href="https://github.com/onopko/setAnimationFrameTimeout">setAnimationFrameTimeout</a> and delayDo:

	```html
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="setAnimationFrameTimeout.min.js"></script>
	<script src="delayDo.min.js"></script>
	```
2. Initialize a delayDo timer (just name a specific timer id) and add functions to its queue:

	```javascript
	for (var i =0; i < 10; i++) {
		$.delayDo('timerId', function () {
			// do something.
		});
	}
	```

	```javascript

	$.delayDo('timerId', function () {
		// do something.
	});
	$.delayDo('timerId', function () {
		// do another.
	});
	```

3. Resume the delayDo timer. It calls a function from its queue one by one at regular intervals:

	```javascript
	$.delayDo.resume({
		timerId: 'timerId',
		interval: 200,
		complete: function () {
			// do something.
		}
	});
	```

## Initialize a timer and add functions to its queue

```javascript
$.delayDo(
	// type 'string': A delayDo timer’s specific id (name).
	'timerId',

	// type 'function': A function that is added to the delayDo timer’s queue.
	function () {
		// do something.
	}
);
```

## Methods

#### $.delayDo.resume()

Resume the delayDo timer.

```javascript
$.delayDo.resume({
	timerId: 'timerId',

	// type 'number'
	// unit 'millisecond'
	// Functions in the queue of delayDo timer is executed one by one at this interval.
	interval: 200,

	// type 'number'
	// unit 'millisecond'
	// This method will be called after this property’s value.
	delay: null,

	// type 'function'
	// This is executed after that the queue of delayDo timer became empty.
	complete: function () {
		// do something.
	}
});
```

#### $.delayDo.cancel()

Clear the queue off a specific delayDo timer and destroy itself.

```javascript
$.delayDo.cancel('timerId');
```

#### $.delayDo.bustercall()

Clear all queues off delayDo timers and destroy themselves.

```javascript
$.delayDo.bustercall();
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
