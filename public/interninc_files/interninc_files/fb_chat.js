function gsCookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie.length>0 && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {  
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

function callbackFn(status) {
	if (status.success) {
		var obj = status.ref;
		window.onload = function() {
			if (obj && typeof obj.loadsndfx != "undefined") {
				//LOAD MP3'S
				obj.loadsndfx('doh.mp3');
				//ATTACH SNDFX TO BUTTONS
				
				//ONLOAD EVENT
				
			}
		};
	}
};

/*

Copyright (c) 2009 Anant Garg (anantgarg.com | inscripts.com)

This script may be used for non-commercial purposes only. For any
commercial purposes, please contact the author at 
anant.garg@inscripts.com

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

History Icon by Yusuke Kamiyamane
Group Chat Icon by MomentIcons
*/


var jb_windowFocus = true;
var jb_username;
var jb_chatHeartbeatCount = 3;
var jb_minChatHeartbeat = 1000;
var jb_maxChatHeartbeat = 33000;
var jb_chatHeartbeatTime = jb_minChatHeartbeat;
var jb_originalTitle;
var jb_blinkOrder = 0;
var smilehtml;
var smilebackhtml;

var jb_chatboxFocus = new Array();
var jb_newMessages = new Array();
var jb_newMessagesWin = new Array();
var jb_chatBoxes = new Array();
var chattile='';
var jb_message=" ";
var maxHeight = 94;

soundManager.url = jb_abs_link+'/components/com_jbolo/sound/';
soundManager.onload = function() {
soundManager.createSound('newmsg',jb_abs_link+'/components/com_jbolo/sound/newsound.mp3');
};

jQuery(document).ready(function(){

	jb_originalTitle = document.title;
	startChatSession();

	jQuery([window, document]).blur(function(){
		jb_windowFocus = false;
	}).focus(function(){
		jb_windowFocus = true;
		document.title = jb_originalTitle;
	});
	for (x in jb_newMessagesWin) { 
			
			jb_newMessagesWin[x] = false;
		}
});

function strstr( haystack, needle ,bool) {
    var pos = 0;
     
    haystack += '';
    pos = haystack.indexOf( needle );
    if (pos == -1) {
        return false;
    } else{
        if( bool ){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
}

function restructureChatBoxes(){
	var align = 0;
	for (x in jb_chatBoxes) {
		if (jb_chatBoxes) {
			chatboxtitle = jb_chatBoxes[x];
			if ((strstr(jb_chatBoxes[x], 'function')) == false) {
				if (jQuery("#chatbox_" + chatboxtitle).css('display') != 'none') {
					if (align == 0) {
						jQuery("#chatbox_" + chatboxtitle).css('right', '20px');
					}
					else {
						var width = (align) * (225 + 7) + 20;
						jQuery("#chatbox_" + chatboxtitle).css('right', width + 'px');
					}
					align++;
				}
			}
		}	
	}
}

function chatWithjs(chatuser) {  
	createChatBox(chatuser); 
	jQuery("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle,minimizeChatBox) {
	if (jQuery("#chatbox_"+chatboxtitle).length > 0) { 
		if (jQuery("#chatbox_"+chatboxtitle).css('display') == 'none') {
			jQuery("#chatbox_"+chatboxtitle).css('display','block');
			restructureChatBoxes();
		}
		jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").css('display','block');
		jQuery("#chatbox_"+chatboxtitle+" .chatboxinput").css('display','block');
		jQuery('#'+chatboxtitle+'_thumb').css('display','block'); 
		jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
		return;
	}
		var history = '',sendfile = '',groupchat = '';

		if(chat_config_array[0]==1 && chatboxtitle.length<6)
		history = '<img src="'+jb_abs_link+'components/com_jbolo/img/history.gif" alter="History" title="View History" onClick="javascript:getHistory(\''+chatboxtitle+'\');"/>';
		
		if(chat_config_array[1]==1 && chatboxtitle.length<6)
		sendfile = '<img src="'+jb_abs_link+'components/com_jbolo/img/sendfile.gif" alter="Send File" title="Send File" onClick="javascript:sendFile(\''+chatboxtitle+'\');"/>';

		if(chat_config_array[2]==1)
		groupchat = '<img src="'+jb_abs_link+'components/com_jbolo/img/groupchat.gif" onClick="javascript:showGroupOption(\''+chatboxtitle+'\');" alter="Group Chat" title="Group Chat" />';

		//Changed:For FB Chat Bar
		jQuery(" <div />" ).attr("id","chatbox_"+chatboxtitle)
		.addClass("chatbox")
		.html('<div class="chatboxhead" onclick="closeChatBox(\''+chatboxtitle+'\')"><div class="chatboxtitle"></div><div class="chatboxoptions"><span class="minimize">_</span><span onclick="hidediv(\''+chatboxtitle+'\')" class="minimize">X</span></div><br clear="all"/></div><div class="jb_invite">Add Person to Group Chat:<input class="groupinvite" type="text" /></div><div id='+chatboxtitle+'_thumb class="chatboxistatus"><div class="jfb_customstatus"></div><div class="chatboximgs">'+groupchat+sendfile+history+'<img src="'+jb_abs_link+'components/com_jbolo/img/clear.gif" alter="Clear Conversation" title="Clear Conversation" onClick="javascript:clearChat(\''+chatboxtitle+'\');"/></div></div><div class="chatboxcontent"></div><div class="chatboxoffline">'+jb_offlinemsg+'</div><div class="chatboxinput"><span><img src="'+jb_abs_link+'components/com_jbolo/img/smileys/default/smile.jpg" onClick="javascript:showSmiley(this);" class="smileyimage" /></span><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');"></textarea></div>')
		.appendTo(jQuery( "body" ));

	jQuery("#chatbox_"+chatboxtitle).css('bottom', '0px');
	jQuery("#chatbox_"+chatboxtitle).css('z-index', 10000);

	jb_userinvitelist = new Array();
	jb_userinviteid= new Array();
	
	/*jQuery("#chatbox_"+chatboxtitle+" .groupinvite").autocomplete({
	search: function(event, ui) { jQuery.ajax({
	  url: jb_abs_link+"index2.php?option=com_jbolo&action=getPlainList&uid="+chatboxtitle,
	  cache: false,
	  dataType: "json",
	  success: function(usrlist) { 
		jb_userinvitelist = new Array();
		jb_userinviteid= new Array();
	  	if(usrlist!=null)
		{
			if(usrlist.l!=null)
			{
				jQuery.each(usrlist.l, function(i,item)
				{
					if(item)
					{ // fix strange ie bug
						if(this.o!=null && this.i!=null) {
							if (this.i != chatboxtitle) {
								jb_userinvitelist.push(this.o);
								jb_userinviteid.push(this.i);
							}
						}
					}
				});
				jQuery("#chatbox_"+chatboxtitle+" .groupinvite").autocomplete({
				  source: jb_userinvitelist });
			}
		}}
	  }); },
	   	 source: jb_userinvitelist,
		 select: function(event, ui){
		 	for(var i =0; i <jb_userinviteid.length; i++){
					if(ui.item.value == jb_userinvitelist[i]){
						addtogroup(jb_self_id, chatboxtitle, jb_userinviteid[i]);
					} 
				}
			}
		});*/
	  
	chattitle = chatboxtitle;
	jQuery.ajax({
	  url: jb_abs_link+"index.php?option=com_jbolo&action=getinfo&uid="+chatboxtitle,
	  cache: false,
	  dataType: "json",
	  success: function(udetails) { 
	   	chattitle = udetails.name;

	/* Changes for status icons */	
			if(udetails.thumb != '')
			{
				var newHTML = "<div class=jfb_insideimage><img class=timgidclass src="+udetails.thumb+" /></div>";
					var oldHTML = document.getElementById(chatboxtitle+"_thumb").innerHTML;
				document.getElementById(chatboxtitle+"_thumb").innerHTML = newHTML+oldHTML;
			}
				
			if(udetails.status == '1')
			{	
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").html(chattitle.substr(0,25));
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_green').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_grey');
				jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/greendot.gif) no-repeat scroll 2px center');
			}
			else if(udetails.status == '2')
			{
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").html(chattitle.substr(0,25));
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_green').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_grey');
				jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/yellowdot.gif) no-repeat scroll 2px center');
			}
			else if(udetails.status == '0')
			{
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").html(chattitle.substr(0,25));
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_grey').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_green');
				jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/greydot.gif) no-repeat scroll 2px center');
			}
			else if(udetails.status == '3')
			{
				jQuery("#chatbox_"+chatboxtitle+" .jfb_customstatus").html(udetails.cmsg);
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").html(chattitle.substr(0,25));
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_green').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_grey');
				jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/greendot.gif) no-repeat scroll 2px center');
			}
			else
			{
				var grouptip = '<span class="hasTip" title="'+chattitle+'">'+chattitle.substr(0,25)+'</span>';
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").html(grouptip);
				jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_green').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_grey');
			}
			/* END Changes for status icons */
		}
	});
    
	chatBoxeslength = 0;
	
	for (x in jb_chatBoxes) {
		if (jb_chatBoxes) {
			if ((strstr(jb_chatBoxes[x], 'function')) == false) {
				if (jQuery("#chatbox_" + jb_chatBoxes[x]).css('display') != 'none') {
					chatBoxeslength++;
				}
			}
		}	
	}


	if (chatBoxeslength == 0) {
		jQuery("#chatbox_"+chatboxtitle).css('right', '20px');
	} else {
		width = (chatBoxeslength)*(225+7)+20;
		jQuery("#chatbox_"+chatboxtitle).css('right', width+'px');
	}
	
	jb_chatBoxes.push(chatboxtitle);

	if (minimizeChatBox == 1) {
		minimizedChatBoxes = new Array();

		if (gsCookie('chatbox_minimized')) {
			minimizedChatBoxes = gsCookie('chatbox_minimized').split(/\|/);
		}
		minimize = 0;
		for (j=0;j<minimizedChatBoxes.length;j++) { 
			if (minimizedChatBoxes[j]) {
				if (minimizedChatBoxes[j] == chatboxtitle) {
					minimize = 1;
				}
			}	
		}

		if (minimize == 1) {
			jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
			jQuery('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
		}
	}

	jb_chatboxFocus[chatboxtitle] = false;

	jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
		jb_chatboxFocus[chatboxtitle] = false;
		jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
	}).focus(function(){
		jb_chatboxFocus[chatboxtitle] = true;
		jb_newMessages[chatboxtitle] = false;
		jQuery('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('chatboxblink');
		jQuery("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
	});

	jQuery("#chatbox_"+chatboxtitle).show();
}

function showGroupOption(selector) { 
	jQuery('#chatbox_'+selector).find(".jb_invite").toggle();
	jQuery('#chatbox_'+selector+' .jb_invite .groupinvite').val('');
}

function addtogroup(own, ch1, ch2){
	tstamp =  Math.round(new Date().getTime() /1000);
	var owner = own;
	var chat1 = ch1;
	var chat2 = ch2;
	jQuery.ajax({
		url : jb_abs_link+"index2.php?option=com_jbolo&action=groupChat",
		type : 'post',
		data: ({owner : owner, chat1 : chat1, chat2 : chat2, tstamp: tstamp}),
		success: function(data){
			for(var i=0;i<jb_chatBoxes.length;i++)
			{
				if(jb_chatBoxes[i]==chat1)
				{
					jb_chatBoxes[i]=tstamp;
				}
			}
			if(chat1.length < 6) {
				//alert('New Group Added');
				closeChatBox(chat1);
				chatWith(tstamp);
			}
			else {
				jQuery("#chatbox_"+chat1).find(".jb_invite").toggle();
				var newhtml = jQuery("#chatbox_"+chat1+" .chatboxtitle span").attr("title")+','+data;
				if(newhtml.length>25)
					var grptitle = newhtml.substr(0,25)+'...';
				else
					var grptitle = newhtml.substr(0,25);

				var grouptip = '<span class="hasTip" title="'+newhtml+'">'+grptitle+'</span>';
				jQuery("#chatbox_"+chat1+" .chatboxtitle").html(grouptip);
			}
		}
	});
}

function showSmiley(selector) {
	if(	jQuery(selector).parent().find(".jb_smileybox").css("display") == 'block')
	{
		jQuery(selector).parent().find(".jb_smileybox").css("display","none");	
		return false;
	}
	if(smilehtml != null)
	{
		jQuery(selector).parent().html(smilehtml);
		return;
	}
	jQuery.ajax({
		url : jb_abs_link+"components/com_jbolo/smileys.txt",
		success : function (data) {
			smilebackhtml = data;
			var smileyarr = data.split("\n");
			smilehtml = '<img class="smileyimage" src="'+jb_abs_link+'components/com_jbolo/img/smileys/default/smile.jpg" onClick="javascript:showSmiley(this);" /><div class=jb_smileybox><table><tr>';
			var getsmiledata=new Array();
			for(var i=0;i<smileyarr.length-1;i++)
			{
				var getdata = smileyarr[i].split("="); 
				getsmiledata.push(getdata[1]);
			}
			getsmiledata = jbunique(getsmiledata);
			for(var i=0;i<getsmiledata.length-1;i++)
			{
				if(i%2 == 0 && i != 0)
				{
					smilehtml += '</tr><tr>'; 
				}
					smilehtml += '<td><img src="'+jb_abs_link+'components/com_jbolo/img/smileys/default/'+getsmiledata[i]+'" onClick="javascript:smileyClicked(this);" /></td>';
			}
				smilehtml += '</tr></table></div>';
				jQuery(selector).parent().html(smilehtml);
		}
	});
}

function jbunique(arrayName)
{
    var newArray=new Array();
    label:for(var i=0; i<arrayName.length;i++ )
    {  
    	for(var j=0; j<newArray.length;j++ )
        {
           	if(newArray[j]==arrayName[i]) 
                continue label;
         }
         newArray[newArray.length] = arrayName[i];
    }
         return newArray;
}

function smileyClicked(selector) {
	jQuery(selector).parent().parent().parent().parent().parent().hide();
	var srcarr = jQuery(selector).attr("src").split("/");
	if(smilebackhtml != null)
	{
		var smileyarr = smilebackhtml.split("\n");
		for(var i=0;i<smileyarr.length;i++)
		{
			var getdata = smileyarr[i].split("="); 
			if(getdata[1]==srcarr[srcarr.length-1])
			{
				var textareaval = jQuery(selector).parent().parent().parent().parent().parent().parent().parent().parent().find(".chatboxtextarea").val();
				jQuery(selector).parent().parent().parent().parent().parent().parent().parent().parent().find(".chatboxtextarea").val(textareaval+getdata[0]);
				jQuery(selector).parent().parent().parent().parent().parent().parent().parent().parent().find(".chatboxtextarea").focus();
				break;
			}
		}
		return;
	}
	jQuery.ajax({
		url : jb_abs_link+"components/com_jbolo/smileys.txt",
		success : function (data) {
			smilebackhtml = data;
			var smileyarr = data.split("\n");
			for(var i=0;i<smileyarr.length;i++)
			{
				var getdata = smileyarr[i].split("="); 
				if(getdata[1]==srcarr[srcarr.length-1])
				{
					var textareaval = jQuery(selector).parent().parent().parent().parent().parent().parent().parent().parent().find(".chatboxtextarea").val();
					jQuery(selector).parent().parent().parent().parent().parent().parent().parent().parent().find(".chatboxtextarea").val(textareaval+getdata[0]);
					jQuery(selector).parent().parent().parent().parent().parent().parent().parent().parent().find(".chatboxtextarea").focus();
					break;
				}
			}
		}
	});
}

function clearChat(chatboxtitle){
	jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').empty();
	jQuery.post(jb_abs_link+"index.php?option=com_jbolo&action=clearchat", { chatbox: chatboxtitle} , function(data){	
	});
}

function popup(mylink, windowname)
{
	if (! window.focus)return true;
	var href;
	if (typeof(mylink) == 'string')
	href=mylink;
	else
	href=mylink.href;
	window.open(href, windowname, 'width=400,height=400,scrollbars=yes');
	return false;
}

function getHistory(selector){
	var id = selector;
	myLink = jb_abs_link+"index.php?option=com_jbolo&tmpl=component&view=history&tuser="+id;
	popup(myLink, 'History');				
}

function sendFile(selector){
	var id = selector;
	myLink = jb_abs_link+"index.php?option=com_jbolo&tmpl=component&view=sendfile&tuser="+id;
	popup(myLink, 'Send File');				
}

function chatHeartbeat(){ 

	var itemsfound = 0;
	
	if (jb_windowFocus == false) {
 		
		var blinkNumber = 0;
		var titleChanged = 0;
		for (x in jb_newMessagesWin) {
			if (jb_newMessagesWin[x]) {
				
				if (jb_newMessagesWin[x]!=''&& jb_newMessagesWin[x]!='undefined') {
					
					++blinkNumber;
					if (blinkNumber >= jb_blinkOrder) {
						
						document.title = jb_newMessagesWin[x];
						titleChanged = 1;
						break;
					}
				}
			}	
		}
		
		if (titleChanged == 0) {
			document.title = jb_originalTitle;
			jb_blinkOrder = 0;
		} else {
			++jb_blinkOrder;
			
		}

	} else {
		for (x in jb_newMessagesWin) { 
			
			jb_newMessagesWin[x] = false;
		}
	}

	for (x in jb_newMessages) { 
		if (jb_newMessages[x] == true) {
			if (jb_chatboxFocus[x] == false) {
				//FIXME: add toggle all or none policy, otherwise it looks funny
				
				jQuery('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
			}
		}
	}
	
	var jb_usrno = jQuery("#jfbusers>li").length;
	jQuery('#jfb_chatnums').html(jb_usrno);
	jQuery.ajax({
	  url: jb_abs_link+"index.php?option=com_jbolo&action=chatheartbeat&userno="+jb_usrno,
	  cache: false,
	  dataType: "json",
	  error: function(){
        jb_chatHeartbeatCount++;

		if (itemsfound > 0) {
			jb_chatHeartbeatTime = jb_minChatHeartbeat;
			jb_chatHeartbeatCount = 1;
		} else if (jb_chatHeartbeatCount >= 4) {
			jb_chatHeartbeatTime *= 2;
			jb_chatHeartbeatCount = 1;
			if (jb_chatHeartbeatTime > jb_maxChatHeartbeat) {
				jb_chatHeartbeatTime = jb_maxChatHeartbeat;
			}
		}

		setTimeout('chatHeartbeat();',jb_chatHeartbeatTime);
    },


	  success: function(data) { 
		if(data!=null)
		{
			if(data.l!=null)
			{
				jQuery.each(data.l, function(i,item){

					if (item)	{ // fix strange ie bug
						if(this.m!=null && this.show!=null)
						{
							var chatboxtitle = this.f;
					
							thismessage = jb_doReplace(this.m);
							var chatboxidforfb = chatboxtitle;
							if (jQuery("#chatbox_"+chatboxtitle).length <= 0) {
								createChatBox(chatboxtitle);
							}
							if (jQuery("#chatbox_"+chatboxtitle).css('display') == 'none') {
								jQuery("#chatbox_"+chatboxtitle).css('display','block');
								restructureChatBoxes();
							}
					
							if (this.s == 1) {
								this.f = trans_me;//jb_username;
							} else if (this.s == 0) {
								this.f = this.show;
							}
					
							if(this.lst!=null)
							{
								jQuery("#jfbusers").html(this.lst);
							}
					
							//jQuery('#chatbox_'+chatboxtitle+' .chatboxoffline').css('display','none');
							jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').css('height','200px');
							jQuery('#jfb_user_'+chatboxtitle).css('display','block');
	
							if (this.s == 2) {
								jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+thismessage+'</span></div>');
							} else {
	
								jb_newMessages[chatboxtitle] = true;
								if(jb_windowFocus == false)
								{
									soundManager.play('newmsg');
								}
								jb_newMessagesWin[chatboxtitle] = this.show + " " + jb_says;
								jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+this.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+thismessage+'</span></div>');
							}
							jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop(jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
							itemsfound += 1;
							//Changed:For FB Chat Bar
							jbolohandler(chatboxidforfb);
							chatboxtitle= null;
						}
						else
						{
							jQuery("#jfbusers").html(this.lst);
						}
				
					} 
				});
			}
		}

		jb_chatHeartbeatCount++;

		if (itemsfound > 0) {
			jb_chatHeartbeatTime = jb_minChatHeartbeat;
			jb_chatHeartbeatCount = 1;
		} else if (jb_chatHeartbeatCount >= 4) {
			jb_chatHeartbeatTime *= 2;
			jb_chatHeartbeatCount = 1;
			if (jb_chatHeartbeatTime > jb_maxChatHeartbeat) {
				jb_chatHeartbeatTime = jb_maxChatHeartbeat;
			}
		}

		setTimeout('chatHeartbeat();',jb_chatHeartbeatTime);
	}});

}

function closeChatBox(chatboxtitle) {
	jQuery('#chatbox_'+chatboxtitle).css('display','none');
	restructureChatBoxes();

	//Changed: For FB Chat Bar
	var chatid=chatboxtitle;
	callFromChat(chatid);

	jQuery.post(jb_abs_link+"index.php?option=com_jbolo&action=closechat", { chatbox: chatboxtitle} , function(data){	
	});
}

function checkChatBoxInputKey(event,chatboxtextarea,chatboxtitle) {  
 //alert(jQuery(chatboxtextarea).val());

	if(event.keyCode == 13 && event.shiftKey == 0)  {
		jb_message = jQuery(chatboxtextarea).val();
		msg = jb_message.replace(/^\s+|\s+$/g,"");

		jQuery(chatboxtextarea).val('');
		jQuery(chatboxtextarea).focus();
		jQuery(chatboxtextarea).css('height','44px');
		if (msg != '') {
			jQuery.post(jb_abs_link+"index.php?option=com_jbolo&action=sendchat", {to: chatboxtitle, message: msg} , function(sendop){
				jb_message = msg.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
				nmessage = jb_doReplace(jb_message);

				var the_length=sendop.length;
				var last_char=sendop.charAt(the_length-1);
				if(last_char=='0')
				{
					sendop = sendop.substring(0, sendop.length-1);
					jQuery("#chatbox_"+chatboxtitle+" .chatboxoffline").html(jb_offlinemsg);
					jQuery('#chatbox_'+chatboxtitle+' .chatboxoffline').css('display','block');
					jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').css('height','184px');
					jQuery('#jb_user_'+chatboxtitle).css('display','none');
					jQuery('#jb_user_'+chatboxtitle+' a').removeClass('img_red img_green').addClass('img_off');
					jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_grey').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_green');
					jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/greydot.gif) no-repeat scroll 2px center');
				}
				else if(last_char=='2')
				{
					sendop = sendop.substring(0, sendop.length-1);
					jQuery("#chatbox_"+chatboxtitle+" .chatboxoffline").html(jb_awaymsg);
					jQuery('#chatbox_'+chatboxtitle+' .chatboxoffline').css('display','block');
					jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').css('height','184px');
					jQuery('#jb_user_'+chatboxtitle+' a').removeClass('img_off img_green').addClass('img_red');
					jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_green').removeClass('jfb_chatbx_grey');
					jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/yellowdot.gif) no-repeat scroll 2px center');
				}
				else
				{
					jQuery('#chatbox_'+chatboxtitle+' .chatboxoffline').css('display','none');
					jQuery('#chatbox_'+chatboxtitle+' .chatboxcontent').css('height','200px');
					jQuery('#jb_user_'+chatboxtitle).css('display','block');
					jQuery('#jb_user_'+chatboxtitle+' a').removeClass('img_red img_off').addClass('img_green');
					jQuery("#chatbox_"+chatboxtitle+" .chatboxtitle").addClass('jfb_chatbx_green').removeClass('jfb_chatbx_red').removeClass('jfb_chatbx_yellow').removeClass('jfb_chatbx_grey');
					jQuery('#'+chatboxtitle+'_div .jfb_insidechat a').css('background', 'transparent url('+jb_abs_link+'modules/mod_jbolo/images/greendot.gif) no-repeat scroll 2px center');
				}

				jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+sendop+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+nmessage+'</span></div>');
				jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop(jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
			});
		}
		jb_chatHeartbeatTime = jb_minChatHeartbeat;
		jb_chatHeartbeatCount = 1;

		return false;
	}

	var adjustedHeight = chatboxtextarea.clientHeight;
//	alert(adjustedHeight);
	if(adjustedHeight)
	{
	if (maxHeight > adjustedHeight) {
		adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
		if (maxHeight)
			adjustedHeight = Math.min(maxHeight, adjustedHeight);
		if (adjustedHeight > chatboxtextarea.clientHeight)
			jQuery(chatboxtextarea).css('height',adjustedHeight+8 +'px');
	}
	}	
	 else {
		jQuery(chatboxtextarea).css('overflow','auto');
	}
	
}

function startChatSession(){  
	jQuery.ajax({
	  url: jb_abs_link+"index.php?option=com_jbolo&action=startchatsession",
	  cache: false,
	  dataType: "json",
	  success: function(data) {  
		
		 jb_username = data.jb_username;
		if (jb_username == "undefined") { jb_username = "Guest"; }

		jQuery.each(data.items, function(i,item){ 
			if (this)	{ // fix strange ie bug
				//alert(this.f);
				var chatboxtitle = this.f;
				thismessage = jb_doReplace(this.m);
				
				if (jQuery("#chatbox_"+chatboxtitle).length <= 0) {
					createChatBox(chatboxtitle,1);
				}
				
				if (this.s == 1) {
					this.f = data.me;
				} else if (this.s == 0) {
					this.f = this.show;
				}

				if (this.s == 2) {
					jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+thismessage+'</span></div>');
				} else {
					jQuery("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+this.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+thismessage+'</span></div>');
				}
			}
		});

		for (i=0;i<jb_chatBoxes.length;i++)
			{
				closeChatBox(jb_chatBoxes[i]);
			}
	
	setTimeout('chatHeartbeat();',jb_chatHeartbeatTime);
		
	}});
}

function chat_status(currentstatus) {
	var insidetext;
	if(currentstatus==0)
	{
		insidetext=chat_status_array[0];
	}
	else if(currentstatus==1)
	{
		insidetext=chat_status_array[1];
	}
	else if(currentstatus==2)
	{
		insidetext=chat_status_array[2];
	}
	jQuery("#inside-ch-box-tl").html(insidetext);
	jQuery.post(jb_abs_link+"index2.php?option=com_jbolo&action=chat_status", { stats: currentstatus} , function(data){	
	});
	jQuery("#ch_box_status").toggle();
}

function jfb_show_prompt()
{
var name1=prompt("Please enter your Status Message","");
while(name1 && name1.length > 140){
	alert("Keep the Status length to 140 chars or less")
	name1=prompt("Please enter your Status Message",name1);
}
if (name1!=null && name1!="")
  {
	jQuery('#inside-ch-box-tl').text(name1);
  	jQuery.post(jb_abs_link+"index2.php?option=com_jbolo&action=chat_status", { stats: "3", msg: name1} , function(data){	
	});
  }
}
