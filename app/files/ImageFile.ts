/**
 * Created by Alvaro on 27/09/2016.
 */
import {ImageFileAction, NullAction} from "./actions/ImageAction";

export class ImageFile {

    path: string;
    action: ImageFileAction = new NullAction();

    constructor(path) {
        this.path = path;
        this.action = null;
    }

    execute() {
        this.action.execute(this.path);
    }

}