jQuery.extend({
	
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
					if(dataReturned.length < 1)
					{
						dataReturned = options.fetchedError;
						success = false;
					}
					options.callback(dataReturned, success);

				}

			})
	},
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