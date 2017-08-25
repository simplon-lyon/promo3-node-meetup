const fs = require('fs')
const path = require('path')
const mustache = require('mustache');

class Mustache {
    constructor(folder, watch) {
        this.folder = folder;
        this.watch = watch;
        this.templates = {};
        this.listTemplate(this.folder);
    }

    listTemplate(folder) {
        let that = this;
        fs.readdir(folder, function(err, files) {
            if (err) {
                console.error("fail to load templates:" + err)
                return;
            }
            for (let f of files) {
                let filePath = folder + '/' + f;
                fs.stat(filePath, function(err, stat) {
                    if (err) {
                        console.error("fail to load file info:" + err)
                        return;
                    }
                    if (stat.isDirectory()) {
                        that.listTemplate(folder + '/' + f);
                        return;
                    }
                    that.addTemplate(filePath);
                })
            }
        });
        if (this.watch) {
            fs.watch(folder, function(type, file) {
                let filePath = folder + '/' + file;
                //console.log(type + ': ' + filePath);
                let name = that.nameFromPath(filePath);
                if (type === 'rename') {
                    delete that.templates[name];
                    return
                }
                that.addTemplate(filePath);
            })
        }
    }

    addTemplate(filePath) {
        let that = this;
        fs.readFile(filePath, function(err, content) {
            if (err) {
                console.error("fail to load file:" + err)
                return;
            }
            let name = that.nameFromPath(filePath);
            that.templates[name] = fs.readFileSync(filePath).toString();
            //console.log("that.templates:", that.templates);
        });
    }

    nameFromPath(filePath) {
        let obj = path.parse(filePath);
        let folder = obj.dir.substring(this.folder.length);
        if (folder[0] === '/') {
            folder = folder.substring(1) + '/';
        }
        return folder + obj.base;
    }

    engine() {
        let that = this;
        return function(filePath, options, callback) {
            fs.readFile(filePath, function(err, content) {
                if (err) {
                    return callback(err)
                }
                let obj = path.parse(filePath);
                let template = that.templates[obj.base];
                var rendered = mustache.render(template, options, that.templates);
                return callback(null, rendered);
            })
        };
    }
}

module.exports = Mustache;