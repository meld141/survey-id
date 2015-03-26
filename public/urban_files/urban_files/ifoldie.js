/* OldIE Script by Ryan McLaughlin, DaoByDesign.com */

/* Check the browser */
var browser		= navigator.appName
var ver			= navigator.appVersion
var thestart	= parseFloat(ver.indexOf("MSIE"))+1
var brow_ver	= parseFloat(ver.substring(thestart+4,thestart+7))

/* If the browser is IE < 7 (edit version as necessary)... */
if ((browser=="Microsoft Internet Explorer") && (brow_ver < 7))
{ window.location="http://www.urbaninterns.com/oldie.html"; } /* Then send them to our OldIE splash page */
