$.share.addEventListener('click', function() {
	// Add the Android-specific function to hide the keyboard
	Ti.UI.Android.hideSoftKeyboard();
	
	// create an Android intent whose action is to send plain text data
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_SEND,
        type: 'text/plain'
    });
    // define two extra fields for the intent
    // one should be Ti.Android.EXTRA_SUBJECT with a subject of your choosing
    // the other is Ti.Android.EXTRA_TEXT which should be set to the contents of the message box
    intent.putExtra(Ti.Android.EXTRA_SUBJECT, 'Isn\'t This Cool!');
    intent.putExtra(Ti.Android.EXTRA_TEXT, $.message.value);
    // wrapped in a try/catch block, start the activity, passing the intent object
    // within the catch block, display a notification stating that no suitable sharing apps are installed
    try {
        Ti.Android.currentActivity.startActivity(intent);
    } catch (ex) {
        /* Handle Exception if no suitable apps installed */
        Ti.UI.createNotification({ message : 'No sharing apps installed!' }).show();
    }
});


$.index.open();
