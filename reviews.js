/*
	This script is used on the reviews page and allows users reviews
	to be saved to the browsers local storage.
	There is also a function that returns todays date in the format dd/mm/yyyy
*/

// standard functions for local storage
function setObject(key, value) {
	window.localStorage.setItem(key,JSON.stringify(value));
};
function getObject(key) {
	var storage = window.localStorage;
	var value = storage.getItem(key);
	return value && JSON.parse(value);
};
function clearStorage() {
	// clears local storage
	window.localStorage.clear();
};

// function that clears the name and text boxes
function clearComment(){
	$('#namebox').val('');
	$('#txt1').val('');
};

// saves the review into local storage
function saveComment() {
	// variables declared to hold user input
	var ctext = $('#txt1').val();
	var cname = $('#namebox').val();

	// checks to see whether the user entered a name and if not, make anon
	if (cname === ''){
		cname = 'Anon';
	}
	
	// checks to see whether the user entered clear to clear the storage in either the name box or the text box
	if (cname === "clear" || ctext === "clear"){
		clearStorage();
		clearComment();
		fetchReviews();
	} else {
		// gets todays date in dd/mm/yyyy
		var todaysDate = todayDate();
		// formats the review that the user entered
		var comment='<p>' + ctext + '</p><p style="font-style: italic; padding-left: 10px;">' + cname + ' - posted on: '+ todaysDate +'</p>';
		
		var oldReviews;
		// checks to see whether anything is in storage
		if(getObject('store') === null) {
			// nothing is in the local storage and so variable left blank
			oldReviews = '';
		} else {
			// local storage has content and is stored in variable
			oldReviews = getObject('store');
		}
		// the current user review is added onto the end of the content that was in local storage
		oldReviews = comment + oldReviews;
		// old and current reviews are placed into local storage
		setObject('store', oldReviews);
		// get old comments
		fetchReviews();
		// clear boxes
		clearComment();
	}
}

// get old reviews
function fetchReviews(){
	// old reviews stored
	var oldReviews = getObject('store');
	// checks if local storage has content
	if(oldReviews === null){
		oldReviews = '';
	}
	//display the comments
	$('#oldReviews').empty();
	$('#oldReviews').append(oldReviews);
};

// gets todays date
function todayDate() {
	// new date declared
	var today = new Date();
	// gets day date - dd 
	var dd = today.getDate();
	// gets month date - mm
	var mm = today.getMonth()+1;
	// gets year date - yyyy
	var yyyy = today.getFullYear();
	// makes sure single digit has 0 in front of it
	if(dd < 10) {
		dd='0'+dd;
	} 
	// makes sure single digit has 0 in front of it
	if(mm < 10) {
		mm='0'+mm;
	}
	// forms the date from the variables above
	today = dd+'/'+mm+'/'+yyyy;
	// date returned
	return today;
}