/**
 * Created by Alvaro on 27/09/2016.
 */
import {ImageFileAction, NullAction} from "./actions/ImageAction";

export class ImageFile {

    /**
     * The path of the image.
     */
    path: string;

    /**
     * The action to be performed on the image.
     */
    action: ImageFileAction;

    constructor(path) {
        this.path = path;
        this.action = new NullAction();
    }

    execute() {
        this.action.execute(this.path);
    }

}