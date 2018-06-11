
let _ = require('lodash'),
    path = require('path-ultra'),
    getLastPost = require('./lastPostUtils'),
    fs = require('fs-ultra');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('lastPost', function(context) {
        let newestPostFilename = getLastPost();

       if (!newestPostFilename)
            return console.log('No posts found, lastPost not possible');

        var fn,
            data = options.data[newestPostFilename],
            template = Handlebars.partials[newestPostFilename];

        _.extend(context, data);

        if (typeof template === 'function')
            fn = template;
        else
            fn = Handlebars.compile(template);

        let output = fn(context).replace(/^\s+/, '');
        return output;
    });

};



