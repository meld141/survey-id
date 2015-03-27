/* Click boxes: Schedules day of week & morn/noon/night  */
function changeScheduleLink(linkId) {		if ($('#check-schedule'+linkId).attr('class') == 'select-schedule-deactivate'){;			$('#check-schedule'+linkId).removeClass('select-schedule-deactivate');			$('#check-schedule'+linkId).addClass('select-schedule');		}		else {			$('#check-schedule'+linkId).removeClass('select-schedule');			$('#check-schedule'+linkId).addClass('select-schedule-deactivate');		}		var schedule = '';		$('#schedule_ids').val(schedule);
				$('.select-schedule').each(function(i){			schedule += $(this).children(i).attr('alt') + '###';			$('#schedule_ids').val(schedule);			$('.schedule-div .error').css('display', 'none');		});		}


function validateCoupon(type, callBack){
	var code = $('input[name=promo_code]').val();
		$.getJSON("/billing/json",{act:'validate-coupon', code:code, membership_type: type},function(j){		
			if(callBack)
				callBack(j);
		
			else if(!j)
			{
				alert('Promo Code is not valid');
			}
			else	
			{
				var cycle = j.cycles;
				var amount = j.amount;
			}
		}
	);
}


function getURLParam(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href );  
	return ( results == null ) ?  null: results[1];
}