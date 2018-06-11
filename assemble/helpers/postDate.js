
let _ = require('lodash'),
    path = require('path-ultra'),
    getLastPost = require('./lastPostUtils'),
    fs = require('fs-ultra');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('postDate', function(context) {
        let partialName = this.pagename;
        
        if (!partialName)
            partialName = getLastPost();
        else
            partialName = partialName.substring(0, partialName.length - 5); // ughly way to remove .html extension

        //partialName =  partialName.substring(0, partialName.length - 5); 
        let stats = fs.statSync(`./assemble/partials/pages/posts/${partialName}.hbs`);
        let created = new Date(stats.birthtime);

        let util = require('util');
        //this.posts = postData;

        //_.extend(context, data);
        return (created.getMonth() + 1) + '/'  + created.getDate() + '/' + created.getFullYear();
    });

};



