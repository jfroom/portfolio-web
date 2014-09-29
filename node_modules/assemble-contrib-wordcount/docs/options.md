### speed
Type: `Number`
Default: `300`

Average "words per minute" to use for calculating reading time. This plugin uses 300 as the default based on the averages listed in [this Forbes article](http://onforb.es/1crk3KF).

### seconds
Type: `Boolean`
Default: `undefined`

Define `seconds: true` in the option to display seconds and minutes. Example: `7 min, 47 sec`. (by default time is rendered in 1 minute increments, e.g. `8 min`).

### placement
Type: `String`
Default: `prepend`

Determines whether the wordcount and reading time will be prepended or appended. Example:

### selector
Type: `String`
Default: `.wordcount`

The selector to target for the element that wraps the content that contains the words to count.

### countSelector
Type: `String`
Default: `.label-wordcount`

The selector to use for the element that will render the wordcount.

### timeSelector
Type: `String`
Default: `.label-reading-time`

The selector to use for the element that will render the estimated reading time.
