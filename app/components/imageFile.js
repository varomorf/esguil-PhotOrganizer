"use strict";
const p = require('path');
const fs = require("fs");
class ImageFileAction {
}
exports.ImageFileAction = ImageFileAction;
class NullAction extends ImageFileAction {
    constructor() {
        super();
        name = 'No action';
    }
    execute(path) {
        console.log('Executing action NullAction on path: ' + path);
    }
}
exports.NullAction = NullAction;
class KeepAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Keep';
    }
    execute(path) {
        var keepDir = p.dirname(path) + '/keep';
        var newPath = keepDir + '/' + p.basename(path);
        console.log('Executing action Keep on path: ' + path + ' to dir:' + newPath);
        fs.mkdirSync(keepDir);
        fs.renameSync(path, newPath);
    }
    ;
}
exports.KeepAction = KeepAction;
class RetouchAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Retouch';
    }
    execute(path) {
        console.log('Executing action RetouchAction on path: ' + path);
    }
    ;
}
exports.RetouchAction = RetouchAction;
class PrivateAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Private';
    }
    execute(path) {
        console.log('Executing action PrivateAction on path: ' + path);
    }
    ;
}
exports.PrivateAction = PrivateAction;
class DeleteAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Delete';
    }
    execute(path) {
        console.log('Executing action DeleteAction on path: ' + path);
    }
    ;
}
exports.DeleteAction = DeleteAction;
class ImageFile {
    constructor(path) {
        this.path = path;
        this.action = null;
    }
    execute() {
        this.action.execute(this.path);
    }
}
exports.ImageFile = ImageFile;
//# sourceMappingURL=imageFile.js.map