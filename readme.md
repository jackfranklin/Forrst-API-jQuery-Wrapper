This API has just been updated to match Forrst's V2 API implementation.

It supports all the methods in the Forrst API that DON'T require authenticating.

It is used like so:

    $.forrstApi(func, callback, params, options)

*func* : the API call you wish to make. These match the API documentation. Any slashes are ignored. So to call posts/all, the func parameter is "postsall".

*callback*: a callback function to handle the data returned. Data is passed into the callback function, so your first parameter will be the returned data. EG:
	function(d) {console.log(d);} //here d == the returned object from the API

*params* : any parameters that need to be passed to the API with the function call

*options*: any additional options you need to set (these are useless for now, please *IGNORE* these)

For example, to get the information on my user, 'jackfranklin', my code would look like so:

$.forrstApi("usersinfo", function(d) {...}, {'username':'jackfranklin'});

Not all calls need to be passed parameters. If they don't, you can simply leave out that.

###TO DOs:
1. Better way of dealing with errors (currently all left down to the end user and not dealt with in the wrapper)
2. Add additional options that may be of use