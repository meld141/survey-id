

function jb_doLinks(text)
	{
		if( !text ) return text;

		if(text.match(/Download Link: /i))
		{	
			text = text.replace(/((https?\:\/\/|ftp\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,function(url){
				
				if(!url.match('^https?:\/\/'))
					url = 'http://'+url;

				var txt='<a target="_blank" rel="nofollow" href="'+ url +'">';
				txt += 'Click Here';
				txt += '</a>';
				return txt;
			});
		}
		else
		{
			text = text.replace(/((https?\:\/\/|ftp\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,function(url){
				
				if(!url.match('^https?:\/\/'))
					url = 'http://'+url;

				return '<a target="_blank" rel="nofollow" href="'+ url +'">'+ url +'</a>';
			});
		}

		return text;
	}


function jb_doSmileys(text) {
	text = text.replace(':)', '<img src="/components/com_jbolo/img/smileys/default/smile.jpg" border="0" />');
	text = text.replace(':-)', '<img src="/components/com_jbolo/img/smileys/default/smile.jpg" border="0" />');
	text = text.replace(':(', '<img src="/components/com_jbolo/img/smileys/default/sad.jpg" border="0" />');
	text = text.replace(':-(', '<img src="/components/com_jbolo/img/smileys/default/sad.jpg" border="0" />');
	text = text.replace(';)', '<img src="/components/com_jbolo/img/smileys/default/wink.jpg" border="0" />');
	text = text.replace(';-)', '<img src="/components/com_jbolo/img/smileys/default/wink.jpg" border="0" />');
	text = text.replace(';(', '<img src="/components/com_jbolo/img/smileys/default/cry.jpg" border="0" />');
	text = text.replace('B-)', '<img src="/components/com_jbolo/img/smileys/default/cool.jpg" border="0" />');
	text = text.replace('B)', '<img src="/components/com_jbolo/img/smileys/default/cool.jpg" border="0" />');
	text = text.replace(':D', '<img src="/components/com_jbolo/img/smileys/default/grin.jpg" border="0" />');
	text = text.replace(':-D', '<img src="/components/com_jbolo/img/smileys/default/grin.jpg" border="0" />');
	text = text.replace(':o', '<img src="/components/com_jbolo/img/smileys/default/shocked.jpg" border="0" />');
	text = text.replace(':O', '<img src="/components/com_jbolo/img/smileys/default/shocked.jpg" border="0" />');
	text = text.replace(':-o', '<img src="/components/com_jbolo/img/smileys/default/shocked.jpg" border="0" />');
	text = text.replace(':-O', '<img src="/components/com_jbolo/img/smileys/default/shocked.jpg" border="0" />');

	return text;
}

function jb_doReplace(text) {

	text = jb_doLinks(text);
	text = jb_doSmileys(text);
	
	return text;
	
}
var trans_me = 'me';
var jb_says = 'says...';
var jb_offlinemsg = 'The user is Offline.';
var jb_awaymsg = 'The user is Away.';
var jb_abs_link = 'http://www.interninc.com/';
var jb_self_id = '0';

var chat_status_array = new Array();
chat_status_array.push('Invisible');
chat_status_array.push('Available');
chat_status_array.push('Away');

var chat_config_array = new Array();
chat_config_array.push('1');
chat_config_array.push('');
chat_config_array.push('');

function showchatdiv(obj1)
{
	jQuery("#ch_box_status").toggle();
}

