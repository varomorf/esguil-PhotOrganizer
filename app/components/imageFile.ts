/**
 * Created by Alvaro on 24/09/2016.
 */

import * as p from 'path';
import * as fs from "fs";

export abstract class ImageFileAction {
    name: string;

    abstract execute(path: string): void;
}

export class NullAction extends ImageFileAction {
    constructor() {
        super();
        name = 'No action';
    }

    execute(path: string) {
        console.log('Executing action NullAction on path: ' + path);
    }
}

export class KeepAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Keep';
    }

    execute(path: string) {
        var keepDir = p.dirname(path) + '/keep';
        var newPath = keepDir + '/' + p.basename(path);

        console.log('Executing action Keep on path: ' + path + ' to dir:' + newPath);
        //TODO check if dir is already created
        fs.mkdirSync(keepDir);
        fs.renameSync(path, newPath);
    };
}

export class RetouchAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Retouch';
    }

    execute(path: string) {
        //TODO do actual func
        console.log('Executing action RetouchAction on path: ' + path);
    };
}

export class PrivateAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Private';
    }

    execute(path: string) {
        //TODO do actual func
        console.log('Executing action PrivateAction on path: ' + path);
    };
}

export class DeleteAction extends ImageFileAction {
    constructor() {
        super();
        name = 'Delete';
    }

    execute(path: string) {
        //TODO do actual func
        console.log('Executing action DeleteAction on path: ' + path);
    };
}

export class ImageFile {

    path: string;
    action: ImageFileAction;

    constructor(path) {
        this.path = path;
        this.action = null;
    }

    execute() {
        this.action.execute(this.path);
    }

}
