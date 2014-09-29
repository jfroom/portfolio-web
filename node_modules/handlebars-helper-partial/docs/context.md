Like Assemble itself, this helper attempts to automatically determine the correct context to use based on the data supplied, but a context can be explicitly passed as a second parameter.

This is how data is merged into the context, in order of precedence:

1. **given context**     : a context explicitly passed as a second parameter, e.g. `{{partial 'foo' bar}}`, will win over other contexts.
1. **YAML front matter** : YAML front matter of the partial
1. **opts.data[name]**   : JSON/YAML data file defined in Assemble `options.data` with a basename matching the name of the partial, e.g `{{partial 'foo'}}` matches `foo.json`
1. **this**              : A context of `this` usually means either YAML front matter of the "inheriting" page or a block expression wrapping the helper
1. **Assemble options**  : Custom properties defined in Assemble options
1. **grunt.config.data** : Data from `grunt.config.data` (e.g. `pkg: grunt.file.readJSON('package.json'`))