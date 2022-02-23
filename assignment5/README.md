### Login!


Add a functionality for a single user authentication!

### Overview

Only Mike@aol.com with password abc123 can navigate to the profile page!

### Description

You have already shown how to create templating pages. By now you should have understanding of sessions and session handling.

### Instructions


* Watch the lecture video and duplicate functionality
* Monitor your console window for errors
* Once all ready move on to the user validation
* Inside your login method create a conditional for
* Email:Mike@aol.com
* Password:abc123
* Depending on the result of the condition, navigate users.
* If the login is good, set the session.loggedin to true and res.render to profile
* If the login is bad, set the session.loggedin to false and res.render to index
