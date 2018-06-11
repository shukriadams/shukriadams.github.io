
let _ = require('lodash'),
path = require('path-ultra'),
fs = require('fs-ultra');

module.exports.register = function(Handlebars, options) {

Handlebars.registerHelper('allPosts', function(context) {
    let posts = fs.readFilesInDirSync('./assemble/partials/pages/posts');
    let postData = [];
    
    for (let post of posts) {
        let filenameBase = path.baseNameWithoutExtension(post);
        let data = options.data[filenameBase];
        
        postData.push({
            url : filenameBase + '.html',
            title : data.title
        });
    }

    this.posts = postData;

    //_.extend(context, data);
    return "";
});

};



