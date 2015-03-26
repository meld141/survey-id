// Google Analytics //
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-226014-7']);
  _gaq.push(['_setDomainName', 'none']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
// Google Analytics //

// Effective Measure (removed 10/6/2013) // 
/*
  (function() {
    var em = document.createElement('script'); em.type = 'text/javascript'; em.async = true;
    em.src = ('https:' == document.location.protocol ? 'https://ph-ssl' : 'http://ph-cdn') + '.effectivemeasure.net/em.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(em, s);
  })();
document.write('<noscript><img src="//ph.effectivemeasure.net/em_image" alt="" style="position:absolute; left:-5px;" /></noscript>');
*/
// Effective Measure // 

//function to read cookies //
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
//function to read cookies //

//function to create cookies //
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value + "; path=/";
}
//function to create cookies //

// Google Remarketing Code //
var rmccookie = 'gatcmr';
var rmchtua = readCookie('HTUA');
var rmctnetsisrep = readCookie('TNETSISREP');
var rmctagged = readCookie(rmccookie);
var rmcurl = window.location.href;

var rmcn1 = rmcurl.indexOf("employers");

if ( rmcurl != null && rmctagged != "PHEMP" && rmcn1 != -1  ) //PH EMPLOYERS visitors
{
	/* <![CDATA[ */
	var google_conversion_id = 1072174240;
	var google_conversion_language = "en";
	var google_conversion_format = "3";
	var google_conversion_color = "ffffff";
	var google_conversion_label = "nbxjCIOd_QIQoKmg_wM";
	var google_conversion_value = 0;
	/* ]]> */

	document.write('<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js"></script>');
	document.write('<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/1072174240/?label=nbxjCIOd_QIQoKmg_wM&amp;guid=ON&amp;script=0"/></div></noscript>');
	setCookie(rmccookie, 'PHEMP', 30);
}

else if ( (rmchtua != null || rmctnetsisrep != null) && rmctagged != "PHLOGGED" && rmctagged != "PHEMP" ) // PH logged in users
{
	/* <![CDATA[ */
	var google_conversion_id = 1072174240;
	var google_conversion_language = "en";
	var google_conversion_format = "3";
	var google_conversion_color = "ffffff";
	var google_conversion_label = "L8MmCPOvzAIQoKmg_wM";
	var google_conversion_value = 0;
	/* ]]> */
	
	document.write('<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js"></script>');
	document.write('<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/1072174240/?label=L8MmCPOvzAIQoKmg_wM&amp;guid=ON&amp;script=0"/></div></noscript>');
	setCookie(rmccookie, 'PHLOGGED', 30);
}
else if ( rmctagged == null ) //PH visitors
{
	/* <![CDATA[ */
	var google_conversion_id = 1072174240;
	var google_conversion_language = "en";
	var google_conversion_format = "3";
	var google_conversion_color = "ffffff";
	var google_conversion_label = "_PJICPuuzAIQoKmg_wM";
	var google_conversion_value = 0;
	/* ]]> */
	
	document.write('<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js"></script>');
	document.write('<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/1072174240/?label=_PJICPuuzAIQoKmg_wM&amp;guid=ON&amp;script=0"/></div></noscript>');
	setCookie(rmccookie, 'PHVISITOR', 30);
}
// Google Remarketing Code //

// New Google Code for Remarketing Tag 

/* <![CDATA[ */
var google_conversion_id = 1072174240;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */

document.write('<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js"></script>');
document.write('<noscript><div style="display:inline;"><img height="1" width="1" style="border-style:none;" alt="" src="http://googleads.g.doubleclick.net/pagead/viewthroughconversion/1072174240/?value=0&amp;guid=ON&amp;script=0"/></div></noscript>');

// New Google Code for Remarketing Tag 
