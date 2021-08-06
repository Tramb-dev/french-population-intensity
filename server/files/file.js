const fs = require('fs');
const path = require('path');

exports.getJson = function(file, callback) {
    if(path.extname(file) == '.json') {
        file = path.normalize(file);
    
        fs.access(file, (error) => {
            if (error) {
                console.log('error', error);
                callback(Buffer.from(`Cannot access to ${file}`), 404);
            } else {
                fs.readFile(file, { flag: 'r', encoding: 'utf8'}, (fileError, data) => {
                    if (fileError) {
                        console.log('fileError', fileError);
                        callback(Buffer.from(`Cannot read ${file}`), 404);
                    } else {
                        callback(JSON.parse(data), 200);
                    }
                })
            }
        });
    }
};