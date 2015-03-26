
	/*
	 *	jquery.suggest 1.1 - 2007-08-06
	 *
	 *	Uses code and techniques from following libraries:
	 *	1. http://www.dyve.net/jquery/?autocomplete
	 *	2. http://dev.jquery.com/browser/trunk/plugins/interface/iautocompleter.js
	 *
	 *	All the new stuff written by Peter Vulgaris (www.vulgarisoip.com)
	 *	Feel free to do whatever you want with this file
	 *
	 */

	(function($) {

		$.suggest = function(input, options) {


			var inputReff = input;
			var $input = $(input).attr("autocomplete", "off");
			var $results = $(document.createElement("ul"));

			var timeout = false;		// hold timeout ID for suggestion results to appear
			var prevLength = 0;			// last recorded length of $input.val()
			var cache = [];				// cache MRU list
			var cacheSize = 0;			// size of cache in chars (bytes?)

			$results.addClass(options.resultsClass).appendTo('body');


			resetPosition();
			$(window)
				.load(resetPosition)		// just in case user is changing size of page while loading
				.resize(resetPosition);

			$input.blur(function() {
				//setTimeout(function() { $results.hide() }, 200);
			});


			// help IE users if possible
			try {
				//$results.bgiframe();
			} catch(e) { }


			// I really hate browser detection, but I don't see any other way
			if ($.browser.mozilla) {

				$input.keypress(processKey);	// onkeypress repeats arrow keys in Mozilla/Opera
			} else
				$input.keydown(processKey);		// onkeydown repeats arrow keys in IE/Safari


			function resetPosition() {
				// requires jquery.dimension plugin
				var offset = $input.offset();
				$results.css({
					top: (offset.top + input.offsetHeight) + 'px',
					left: offset.left + 'px'
				});
			}


			function processKey(e) {
				// handling up/down/escape requires results to be visible
				// handling enter/tab requires that AND a result to be selected
				if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
					(/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {

		            if (e.preventDefault)
		                e.preventDefault();
					if (e.stopPropagation)
		                e.stopPropagation();

	                e.cancelBubble = true;
	                e.returnValue = false;

					switch(e.keyCode) {

						case 38: // up
							prevResult();
							break;

						case 40: // down
							nextResult();
							break;

						case 9:  // tab
						case 13: // return
							selectCurrentResult();
							$results.hide();
							break;

						case 27: //	escape
							$results.hide();
							break;

					}

				} else if ($input.val().length != prevLength) {

					if (timeout)
						clearTimeout(timeout);
					timeout = setTimeout(suggest, options.delay);
					prevLength = $input.val().length;
					$results.hide();
				}


			}


			function suggest() {
				var q = $.trim($input.val());

				if (q.length >= options.minchars) {

					cached = checkCache(q);

					if (cached) {
						
						displayItems(cached['items']);

					} else {

						if (options.multiple == true)
						{
							q = q.split(",");
							var current = q[(q.length)-1];
						} else {
							var current = q;
						}
						$.get(options.source, {name: current}, function(data) {

							$results.hide();
							var items = parseJson(data, q);
							displayItems(items);
							//addToCache(q, items, txt.length);

						},'json');

					}

				} else {

					$results.hide();

				}

			}


			function checkCache(q) {

				for (var i = 0; i < cache.length; i++)
					if (cache[i]['q'] == q) {
						cache.unshift(cache.splice(i, 1)[0]);
						return cache[0];
					}

				return false;

			}

			function addToCache(q, items, size) {

				while (cache.length && (cacheSize + size > options.maxCacheSize)) {
					var cached = cache.pop();
					cacheSize -= cached['size'];
				}

				cache.push({
					q: q,
					size: size,
					items: items
					});

				cacheSize += size;

			}

			function displayItems(items) {

				if (!items)
					return;

				var html = '';
				for ( i in items )
				{
					html += '<li title="' + items[i].id + '">' + items[i].name + '</li>';
				}
				$results.html(html).show();
				position();

				$results
					.children('li')
					.mouseover(function() {
						$results.children('li').removeClass(options.selectClass);
						$(this).addClass(options.selectClass);
					})
					.click(function(e) {
						e.preventDefault();
						e.stopPropagation();
						selectCurrentResult();
					});

			}

			function getTop(elem)	{
				if (elem.offsetParent)		{
					return elem.offsetTop + getTop(elem.offsetParent);
				}	else	{
					return elem.offsetTop;
				}
			}

			function getLeft(elem)	{
				if (elem.offsetParent)	{
					return elem.offsetLeft + getLeft(elem.offsetParent);
				}	else	{
					return elem.offsetLeft;
				}
			}

			function position ()
			{
				$results.css("top",(getTop(inputReff)+22)+"px").css("left",getLeft(inputReff)+"px")
			}

			function parseJson(data, q) {

				var items = new Object;

				for ( i in data) {
					var tmp = new Object;
					tmp.id = data[i].id;
					tmp.name = data[i].name;
					items[i] = tmp;
				}

				return items;
			}

			function getCurrentResult() {

				if (!$results.is(':visible'))
					return false;

				var $currentResult = $results.children('li.' + options.selectClass);

				if (!$currentResult.length)
					$currentResult = false;

				return $currentResult;

			}

			function selectCurrentResult()
			{
				$currentResult = getCurrentResult();

				if (options.multiple == true)
				{
					old = $input.val().substr(0,($input.val().lastIndexOf(",")+1));
				}
				else
				{
					old = '';
				}

				if ($currentResult)
				{
					$input.val(old + $currentResult.text());
					$results.hide();
					if ($input.attr('id')=='student')
					{
						$("#moderator_student").val($currentResult.attr("title"));
						$results.hide();
					}
					else if ($input.attr('id')=='mentor')
					{
						$("#moderator_mentor").val($currentResult.attr("title"));
						$results.hide();
					}
					else if ($input.attr('id')=='user')
					{
						$("#moderator_user").val($currentResult.attr("title"));
						$results.hide();
					}
					else if ($input.attr('id')=='school_name')
					{
						$("#school_page").val($currentResult.attr("title"));
						$results.hide();
					}

					else if ($input.attr('id')=='employer_name')
					{
						$("#employer_page").val($currentResult.attr("title"));
						$results.hide();
					}

					else if ($input.attr('id')=='related')
					{
						var separator = ',';
						//console.log("test"+$currentResult.attr("title"));
						if($("#moderator_related").val()=="")
						{
							var separator = '';

						}
						$("#moderator_related").val($("#moderator_related").val()+separator+$currentResult.attr("title"));
						$results.hide();

					}
					else if ($input.attr('id').indexOf('keypeople_name_')=='0')
					{
						var field_id = Array();
						field_id = $input.attr('id').split('_');
						//console.log(field_id);
						var separator = ',';
						//console.log("test"+"#moderator_people_"+field_id[2]);
						if($("#moderator_people_"+field_id[2]).val()=="")
						{
							var separator = '';

						}
						$("#moderator_people_"+field_id[2]).val($("#moderator_people_"+field_id[2]).val()+separator+$currentResult.attr("title"));
						$results.hide();
					}
                    else if ($input.attr('id').indexOf('_name_')!=-1)
                    {
                       	$("#"+$input.attr('id')+"_value").val($currentResult.attr("title"));
						$results.hide();
                    }

					///////////////////////////////////
					//mentors profile - mentoring info
					else if ($input.attr('id')=='mentoring_info-employer_name')
					{
						$("#employer").val($currentResult.attr("title"));
						$results.hide();
					}
					else if ($input.attr('id')=='mentoring_info-affiliated_employer_name')
					{
						$("#affiliated_employer").val($currentResult.attr("title"));
						$results.hide();
					}
					else if ($input.attr('id')=='mentoring_info-affiliated_school_name')
					{
						$("#affiliated_school").val($currentResult.attr("title"));
						$results.hide();
					}
					///////////////////////////////////

					else
					{
						$("#moderator").val($currentResult.attr("title"));
						$results.hide();
					}


					if (options.onSelect)
					{
						options.onSelect.apply($input[0]);
						$results.hide();
					}
				}
				$results.hide();

			}

			function nextResult() {

				$currentResult = getCurrentResult();

				if ($currentResult)
					$currentResult
						.removeClass(options.selectClass)
						.next()
							.addClass(options.selectClass);
				else
					$results.children('li:first-child').addClass(options.selectClass);

			}

			function prevResult() {

				$currentResult = getCurrentResult();

				if ($currentResult)
					$currentResult
						.removeClass(options.selectClass)
						.prev()
							.addClass(options.selectClass);
				else
					$results.children('li:last-child').addClass(options.selectClass);

			}

		}

		$.fn.suggest = function(source, options , multiple) {

			if (!source)
				return;

			options = options || {};

			options.multiple = multiple;
			options.source = source;
			options.delay = options.delay || 100;
			options.resultsClass = options.resultsClass || 'ac_results';
			options.selectClass = options.selectClass || 'ac_over';
			options.matchClass = options.matchClass || 'ac_match';
			options.minchars = options.minchars || 2;
			options.delimiter = options.delimiter || '\n';
			options.onSelect = options.onSelect || false;
			options.maxCacheSize = options.maxCacheSize || 65536;

			this.each(function() {
				new $.suggest(this, options);
			});

			return this;

		};

	})(jQuery);

