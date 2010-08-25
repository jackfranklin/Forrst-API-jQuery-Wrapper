/*
Author: Jack Franklin
HomePage: http://github.com/jackfranklin/Forrst-API-jQuery-Wrapper
License: Released under the CC Share-Alike license: http://creativecommons.org/licenses/by-sa/3.0/
version: v1

Thanks for looking at the source code! Half of what I know came from looking at code so feel free to have a good old look around! If you want to make any edits, please fork it on Github. And if you have any questions, Skype: jack_franklin.

For more information about the functions and parameters, please view the Github home page and read the README. You can't miss it. There's all the information you need, right there in that file.
*/

jQuery.extend({
	
	/*
		usage: $.forrstPosts({})
		Used to get the user's recent posts, up to a limit of 10.
	*/
	forrstPosts: function(options)
	{
		var defaults = {
			username: 'kyle',
			count: 5,
			since: null,
			lastid: null,
			debugMode: false,
			callback: function() {},
			apiVersion: 'v1',
			cantFetchPosts: 'Sorry, there has been a problem fetching information from Forrst.',
			fetchedError: 'We managed to interact with Forrst but all of your posts are set to private, so we cannot display them here.'

		};
	  	var options = $.extend({},defaults, options);
		var dataReturned,
			script = 'http://api.forrst.com/api/' + options.apiVersion + '/users/posts?username=' + options.username;
			if(options.since != null)
			{
				script += '&since=' + options.since;
			}
			if(options.lastid != null)
			{
				script +='&last_id=' + options.lastid;
			}
			$.ajax({
				url: script,
				type: 'GET',
				dataType: 'jsonp',
				success: function(d) {
					dataReturned = new Array();
					$.each(d.resp.posts, function(i) {
						if(i===options.count) return false;
						
						dataReturned.push(this);
						
					})
					success = true;

				},
				error:function(req,status,error) {
					if(options.debugMode)
					{
						dataReturned = new Array(req, status, error);
					} else {
						dataReturned = options.cantFetchPosts;
					}
					success = false;

				},
				complete: function() 
				{
					if($.isArray(dataReturned))
					{
							if(dataReturned.length < 1)
							{
								dataReturned = options.fetchedError;
								success = false;
							}
					}
				
					options.callback(dataReturned, success);

				}

			})
	},
	/*
		usage: $.forrstUserInfo({})
		Give it a forrst username and it will tell you that member's ID
		Give it a forrst ID and it will tell you that member's username.
	*/
	
	forrstUserInfo: function(options) {
		var defaults = {
			username: 'kyle',
			userId: null,
			apiVersion: 'v1',
			debugMode: false,
			cantFetchInfo: 'We had an issue getting in touch with Forrst',
			invalidData: 'The data you passed in was incorrect',
			callback: function() {}
		}
		var options = $.extend({}, defaults, options);
		var script = 'http://api.forrst.com/api/' + options.apiVersion + '/users/info?',
			dataReturned, getId,success;
		
		if(options.username === null)
		{
			getId = false;
			script += 'id=' + options.userId;
		} else {
			getId = true;
			script += 'username=' + options.username;
		}
	
		$.ajax({
			url: script,
			type: 'GET',
			dataType: 'jsonp',
			success: function(d) {
				
				if(getId)
				{
					
					dataReturned = d.resp.user.id;
				} else {
					dataReturned = d.resp.user.username;
				}
				success = true;

			},
			error:function(req,status,error) {
				if(options.debugMode)
				{
					dataReturned = new Array(req, status, error);
				} else {
					dataReturned = options.cantFetchInfo;
				}
				success = false;

			},
			complete: function() 
			{
				
				if(dataReturned === null)
				{
					dataReturned = options.invalidData;
					success = false;
				}
	
				options.callback(dataReturned, success);

			}
		})
	}
})