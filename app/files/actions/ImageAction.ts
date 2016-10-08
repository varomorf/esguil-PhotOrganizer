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
        this.name = 'No action';
    }

    execute(path: string) {
        console.log('Executing action NullAction on path: ' + path);
    }
}

abstract class MoveFileAction extends ImageFileAction {

    constructor(){
        super();
    }

    abstract getTargetDirPath(): string;

    execute(path: string) {
        var newDir = p.dirname(path) + '/' + this.getTargetDirPath();
        var newPath = newDir + '/' + p.basename(path);

        console.log('Executing action ' + this.name + ' on path: ' + path + ' to dir:' + newPath);
        try {
            // check if dir is already created
            fs.accessSync(newDir, fs.constants.F_OK);
        } catch (e) {
            // It isn't accessible -> create
            fs.mkdirSync(newDir);
        }
        // Do the execution after assuring dir
        fs.renameSync(path, newPath);
    };

}

export class KeepAction extends MoveFileAction {

    constructor() {
        super();
        this.name = 'Keep';
    }

    getTargetDirPath(): string {
        return 'keep';
    };
}

export class RetouchAction extends MoveFileAction {
    constructor() {
        super();
        this.name = 'Retouch';
    }


    getTargetDirPath(): string {
        return 'retouch';
    };
}

export class PrivateAction extends MoveFileAction {
    constructor() {
        super();
        this.name = 'Private';
    }


    getTargetDirPath(): string {
        return 'private';
    };
}

export class DeleteAction extends MoveFileAction {
    constructor() {
        super();
        this.name = 'Delete';
    }

    getTargetDirPath(): string {
        return 'delete';
    };
}
