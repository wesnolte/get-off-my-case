/* Get the cookie values om nom nom */
function getValueFromCookie(b) {
    var a, c, d, e = document.cookie.split(";");
    for (a = 0; a < e.length; a++)
        if (c = e[a].substr(0, e[a].indexOf("=")), d = e[a].substr(e[a].indexOf("=") + 1), c = c.replace(/^\s+|\s+$/g, ""), c == b) return unescape(d)
}

/* Encapsulating code instead of just letting it lay about */
function init() {
	// Get an instance of the REST API client and set the session ID
	var client = new forcetk.Client();
	client.setSessionToken(getValueFromCookie("sid"));
	
	// Retrieve the data representing the current user
	client.currentUser(function(response){
		var user = response;

		// Find cases that belong to the current user
		client.query("SELECT COUNT() FROM Case WHERE ownerId = '{0}' AND status <> 'Closed'".replace("{0}",user.id), function(response){
			Tinycon.setBubble(response.totalSize);
		});			
	});
}

init();