
let _ = require('lodash'),
    path = require('path-ultra'),
    fs = require('fs-ultra');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('lastPost', function(context) {
        let util = require('util');
        let posts = fs.readFilesInDirSync('./assemble/partials/pages/posts');
        let newestPostDate = new Date(-8640000000000000);
        let newestPostFilename = null;

        for (let post of posts) {
            let stats = fs.statSync(post);
            let modified = new Date(util.inspect(stats.birthtime));

            if (modified.getTime() > newestPostDate.getTime()){
                newestPostDate = modified;
                newestPostFilename = path.baseNameWithoutExtension(post)
            }
        }

        if (!newestPostFilename)
            return console.log('No posts found, lastPost not possible');
        
        console.log('Last post : '  + newestPostFilename, newestPostDate);

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



