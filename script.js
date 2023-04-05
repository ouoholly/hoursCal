$('input').keyup(function(){

	// input
    var start_h  = Number($('#start').val().slice(0, 2));  
	var start_m  = Number($('#start').val().slice(2, 4));  
	var end_h  = Number($('#end').val().slice(0, 2));  
	var end_m  = Number($('#end').val().slice(2, 4)); 
    var lunchValue  = Number($('#lunch').val());

	// calculate
	var totalmins = ((end_h*60 + end_m) - (start_h*60 + start_m) - lunchValue)
	var diff_h = totalmins / 60
	var diff_m = totalmins % 60

	// display result
    $('#total_h').html(Math.floor(diff_h)); 
	$('#total_m').html(diff_m); 
	$('#total_decimal').html(diff_h.toFixed(5)); 
	$('#total_minutes').html(totalmins); 

	$('#start_decimal').html(((start_h*60 + start_m)/60).toFixed(2)); 
	$('#end_decimal').html(((end_h*60 + end_m)/60).toFixed(2)); 

	// display the input in 12-hour format
	if (start_h === 24) {
		$('#start_12f').html(start_h - 12 + ":" + String(start_m).padStart(2, '0') + " AM");
	} else if (start_h > 12) {
		$('#start_12f').html(start_h - 12 + ":" + String(start_m).padStart(2, '0') + " PM");
	} else if (start_h === 12) {
		$('#start_12f').html(start_h + ":" + String(start_m).padStart(2, '0') + " PM");
	} else {
		$('#start_12f').html(start_h + ":" + String(start_m).padStart(2, '0') + " AM"); 
	}

	if (end_h === 24) {
		$('#end_12f').html(end_h - 12 + ":" + String(end_m).padStart(2, '0') + " AM");
	} else if (end_h > 12) {
		$('#end_12f').html(end_h - 12 + ":" + String(end_m).padStart(2, '0') + " PM"); 
	} else if (end_h === 12) {
		$('#end_12f').html(end_h + ":" + String(end_m).padStart(2, '0') + " PM");
	} else {
		$('#end_12f').html(end_h + ":" + String(end_m).padStart(2, '0') + " AM"); 
	}

});

// Saved Records section
var startTimeInput = document.querySelector("#start");
var endTimeInput = document.querySelector("#end");
var lunchTimeInput = document.querySelector("#lunch");

var calTotal = document.querySelector("#calTotal");
var minsTotal = document.querySelector("#total_minutes");

var recordsTotal = document.querySelector("#recordsum");
var recordsTotal_mins = document.querySelector("#recordsum_mins");

var savedSection = document.querySelector(".savedcontent")

var saveBtn = document.querySelector("#savebtn");
var clearBtn = document.querySelector("#clearall");

let recordsArray =[];
let recordsSum = [];

clearBtn.onclick = function() {
	$('.savedcontent').html("No saved records yet..."); 
	$('#recordsum').html("NA"); 
	$('#recordsum_mins').html("NA"); 
	recordsArray =[];
	recordsSum = [];
}

saveBtn.onclick = function() {
    if(startTimeInput.value !== "" && endTimeInput.value !== "") {
        addToArray(startTimeInput.value, 
					endTimeInput.value, 
					lunchTimeInput.value, 
					calTotal.innerText,
					minsTotal.innerText);
    }
}

function addToArray (saved_startTimeInput, saved_endTimeInput, saved_lunchTimeInput, saved_calTotal, saved_minsTotal) {
    const r = {
        id : Date.now(),
        s1 : saved_startTimeInput,
		s2: saved_endTimeInput,
		s3: saved_lunchTimeInput,
		s4: saved_calTotal,
		s5: saved_minsTotal,
    };
    recordsArray.push(r);
	recordsSum.push(r.s5);
	//console.log(recordsArray);
	//console.log(recordsSum);
	$('.savedcontent').html(""); 
    addToPage(recordsArray);
	calRecordsSum();
}

function addToPage(recordsArray) {
	for (let r of recordsArray) {
		eachRecord = `
		<div class="savedrow" data-id="${r.id}">
			<span class="savedinfo">
			${r.s1.slice(0, 2)}:${r.s1.slice(2, 4)} - ${r.s2.slice(0, 2)}:${r.s2.slice(2, 4)} (deduct ${r.s3} mins) = <b>${r.s4}</b> (<span class="minsToSum">${r.s5}</span> mins)</span>
			<!-- STILL TESTING <button class="del"><i class="ri-delete-bin-fill"></i></button> -->
        </div>
		`;
		savedSection.innerHTML += eachRecord
	}
}

function calRecordsSum(){
	recordsSum = recordsSum.map(str => {
		return parseInt(str, 10);
	});
	sum = recordsSum.reduce((partialSum, a) => partialSum + a, 0);
	recordsTotal.innerHTML = Math.floor(sum/60) + " hours " + sum%60 + " minutes"
	recordsTotal_mins.innerHTML = sum + " minutes"
}

// -- STILL TESTING -- //
// // Delete individual record
// savedSection.onclick = ((e) => {
//     if (e.target.classList.contains("del")) {
// 		e.target.parentElement.remove();
// 		// el = e.target.parentElement;
// 		// arrayID = el.getAttribute('data-id');
// 		// console.log(arrayID)
//     }
// })


