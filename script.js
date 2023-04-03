$('input').keyup(function(){

    var start_h  = Number($('#start').val().slice(0, 2));  
	var start_m  = Number($('#start').val().slice(2, 4));  

	var end_h  = Number($('#end').val().slice(0, 2));  
	var end_m  = Number($('#end').val().slice(2, 4)); 
	
    var lunchValue  = Number($('#lunch').val());

	var diff_h = ((end_h*60 + end_m) - (start_h*60 + start_m) - lunchValue) / 60
	var diff_m = ((end_h*60 + end_m) - (start_h*60 + start_m) - lunchValue) % 60

	// calculate
    $('#total_h').html(Math.floor(diff_h) + " hours"); 
	$('#total_m').html(diff_m + " minutes"); 
	$('#total_decimal').html(diff_h.toFixed(5) + " hours"); 

	$('#start_decimal').html(((start_h*60 + start_m)/60).toFixed(2)); 
	$('#end_decimal').html(((end_h*60 + end_m)/60).toFixed(2)); 

	// to 12-hour format
	if (start_h > 11) {
		$('#start_12f').html(start_h - 12 + ":" + String(start_m).padStart(2, '0') + " PM"); 
	}
	else {
		$('#start_12f').html(start_h + ":" + String(start_m).padStart(2, '0') + " AM"); 
	}

	if (end_h > 11) {
		$('#end_12f').html(end_h - 12 + ":" + String(end_m).padStart(2, '0') + " PM"); 
	}
	else {
		$('#end_12f').html(end_h + ":" + String(end_m).padStart(2, '0') + " AM"); 
	}

});
