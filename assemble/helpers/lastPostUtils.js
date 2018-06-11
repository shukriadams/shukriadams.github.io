let path = require('path-ultra'),
    fs = require('fs-extra');

// gets the PARTIAL NAME of the last post
module.exports = function(){
    let posts = fs.readFilesInDirSync('./assemble/partials/pages/posts'),
        newestPostDate = new Date(-8640000000000000),
        newestPostFilename = null;

    for (let post of posts) {
        let stats = fs.statSync(post);
        let modified = new Date(stats.birthtime);

        if (modified.getTime() > newestPostDate.getTime()){
            newestPostDate = modified;
            newestPostFilename = path.baseNameWithoutExtension(post)
        }
    }

    return newestPostFilename;
}