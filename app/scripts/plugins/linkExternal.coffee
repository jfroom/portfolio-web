$.fn.linkExternal = (opts) ->
	return this.each( ->
		$.map( $(this).find('a'), (elm,i) ->
			elm = $(elm)
			if elm.attr("href")?.indexOf("http") > -1 && elm.attr('target') == undefined
        elm.attr('target','_blank');
		)
	)
