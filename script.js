/*
	This script is the main script used across all pages.
	It has functions that allow images to popup,
	allows the homepage images to run through a slideshow,
	and validate email addresses.
*/

// jquery ready statement
$( document ).ready(function() {
    console.log( "ready!" );
	
	// on click of image, creat popup and enlarge image
	$('.gallery, .map').click(function() {
		// get source of photo and put photo on popup
		$('.popup-content').attr('src', $(this).attr('src'));
		$('#imgCaption').text($(this).attr('alt'));
		// remove scroll bar
		$('body').css('overflow','hidden');
		// makes sure popup fades in
		$('.popup').fadeIn();
    });
	// on click of popup x, close the popup
	$('span').click(function(){
		$('.popup').fadeOut();
		// scroll bar appears again
		$('body').css('overflow','visible');
	});
	
	// makes sure the old image hides before new image appears
	$("#slideshow > div:gt(0)").hide();

	// sets the intervals for the slideshow
	setInterval(function() {
		// sets fade times and time to stay on one image then append
		$('#slideshow > div:first')
		.fadeOut(2000)
		.next()
		.fadeIn(2000)
		.end()
		.appendTo('#slideshow');
	}, 4000);	
});

// validates emails entered into contact form
function validateForm() {
	// gets value from form
    var x = document.forms["reviewsForm"]["email"].value;
	// gets position of @
    var atpos = x.indexOf("@");
	// gets position of dot
    var dotpos = x.lastIndexOf(".");
	// checks that the email is long enough and has an @ sign and a dot
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid email address");
		// false returned when not valid
        return false;
    } else {
		// if valid email then tell user the message has been sent
		alert("Message sent")
	}
}

// get a new random image from an array
function newImage() {
	// path of images
	var location = "images/home/";
	// declared number to be used to specify index of array
	var imageNum = 0;
	// declared array with file names
	var ImageArray = [
	'devon.jpg', 
	'estuary.jpg',
	'plain.jpg',
	'sea.jpg',
	'woods.jpg',
	'riverCottage.jpg'
	];
	// get a random number and return the array at the index of that number
	function randomImage() {
		image_number = Math.floor((Math.random() * 5) + 0)
		return(ImageArray[image_number])
	}
	// display the random image in the img that has id random
	document.getElementById("random").src = location + randomImage();
}

// function that hides form until user pressed button
function form() {
	// get button
	var button = document.getElementById("showForm");
	// get the div that has the form in it
	var div = document.getElementById("test");

	// function to display the form if button is pressed
	function show() {
		div.style.visibility = "visible";
		div.style.display="unset";
	}
	// function that hides div completely
	function hide() { 
		div.style.visibility = "hidden";
		div.style.display="none";
	}
	
	// checks to see whether or not the form is currently hidden or not
	function toggle() {
		if (div.style.visibility === "hidden") {
			show();
		} else {
			hide();
		}
	}

	hide();

	button.addEventListener("click", toggle, false);
};
