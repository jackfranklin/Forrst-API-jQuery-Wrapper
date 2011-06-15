/*
Author: Jack Franklin
HomePage: http://github.com/jackfranklin/Forrst-API-jQuery-Wrapper
License: Released under the CC Share-Alike license: http://creativecommons.org/licenses/by-sa/3.0/
version: v1

Thanks for looking at the source code! Half of what I know came from looking at code so feel free to have a good old look around! If you want to make any edits, please fork it on Github. And if you have any questions, Skype: jack_franklin.

For more information about the functions and parameters, please view the Github home page and read the README. You can't miss it. There's all the information you need, right there in that file.
*/


jQuery.extend({

    forrstApi: function(method,callback,params,options) {

        
        var defaults = {
            apiVersion: 'v2',
            debugMode: false,
            url: 'http://forrst.com/api/v2/'
        },
        
        callback = callback || undefined,
        params = (params===undefined ? {} : params),
        params = jQuery.param(params),
        options = $.extend({}, defaults, options),
        
        methods = {
            
            stats: function() {
                $.ajax({
                    url: options.url + 'stats/',
                    dataType: 'jsonp',
                    success: function(d) {
                        callback(d);
                    }
                });
            },

            usersinfo: function() {
                $.ajax({
                    url: options.url+"users/info/?" + params,
                    dataType: 'jsonp',
                    success: function(d) {
                        callback(d);
                    }
                });
            },

            userposts: function() {
                $.ajax({
                    url: options.url+"users/posts/?" + params,
                    dataType: 'jsonp',
                    success: function(d) {
                        callback(d);
                    }
                });
            },
            
            postsshow: function() {
                $.ajax({
                    url: options.url+"posts/show/?" + params,
                    dataType: 'jsonp',
                    success: function(d) {
                        callback(d);
                    }
                })
            },
            postsall: function() {
                $.ajax({
                    url: options.url+"posts/all/?" + params,
                    dataType: 'jsonp',
                    success: function(d) {
                        callback(d);
                    }
                })
            },
            postslist: function() {
                $.ajax({
                    url: options.url+"posts/list/?" + params,
                    dataType: 'jsonp',
                    success: function(d) {
                        callback(d);
                    }
                })
            }

                       


        };
        if(typeof methods[method] == 'function') {
            methods[method](); 
        };

        
    }
    
});
