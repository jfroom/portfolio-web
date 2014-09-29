The moment.js lib has plenty of features and options, these examples are just the tip of the iceberg of what [moment.js][moment] can do.

### Tips
Remember that:

* `\{{moment method=null}}` means `moment().method()`, and 
* `\{{moment somedate method="something"}}` means `moment(somedate).method("something")`. 

Also, the handlebars syntax does not allow you pass certain values (like arrays and objects) directly from the tag, so you may need to use YAML frontmatter or supply JSON/YAML data to run those.
