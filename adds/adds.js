const fs = require('fs');
const path = require('path')

module.exports = {

    range: function(start, end) {
        const length = end - start;
        return Array.from({ length }, (_, i) => start + i);
    },

    tm:function ()
    {
        var endTime = process.hrtime()
        return endTime[0] - st[0];
    },

    walk: function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    module.exports.walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
    }



}




__log = function (filename, text) {
    return function (callback) {
        var s = utils.digitime() + ' ' + text + '\n';

        fs.open(filename, "a", 0x1a4, function (error, file_handle) {
            if (!error) {
                fs.write(file_handle, s, null, 'utf8', function (err) {
                    if (err) {
                        console.log(ERR_UTILS_FILE_WRITE + filename + ' ' + err);
                    }
                    fs.close(file_handle, function () {
                        callback();
                    });
                });
            }
            else {
                console.log(ERR_UTILS_FILE_OPEN + filename + ' ' + error);
                callback();
            }
        });
    };
};

//
// let __writeQueue = async.queue(function (task, callback) {
//     task(callback);
// }, MAX_OPEN_FILES);
//
//
// log: function (filename, text) {
//     __writeQueue.push(__log(filename, text));
// }