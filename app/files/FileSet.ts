/**
 * Created by Alvaro on 24/09/2016.
 */
import {ImageFile} from "./ImageFile";
import {DeleteAction, PrivateAction, RetouchAction, KeepAction} from "./actions/ImageAction";
import * as fs from "fs";

export class FileSet {

    /**
     * The path of the directory to be organized.
     * @type {string}
     */
    dirPath: string = '';

    /**
     * An array with all the ImageFile objects representing all images in a folder.
     * @type {Array}
     */
    fileSet: ImageFile[] = [];

    /**
     * The numeric position of the current file been shown.
     * @type {number}
     */
    currentFile: number = 0;

    /**
     * Returns the path of the current image.
     * @returns {string}
     */
    getCurrentImagePath() {
        return this.fileSet[this.currentFile].path;
    }

    /**
     * Returns the name of the current image action.
     * @returns {string}
     */
    getCurrentImageAction() {
        var currentFile = this.fileSet[this.currentFile];

        if(null == currentFile){
            return '';
        }

        return currentFile.action.name;
    }

    /**
     * <p>Shows the next picture of the fileset (as long as it holds at least one image).</p>
     * <p>If the last image was selected, no changes will be done.</p>
     */
    nextImage() {
        if (this.currentFile < this.fileSet.length - 1) {
            this.currentFile++;
        }
    }

    /**
     * <p>Shows the previous picture of the fileset (as long as it holds at least one image).</p>
     * <p>If the first image was selected, no changes will be done.</p>
     */
    prevImage() {
        if (this.currentFile != 0) {
            this.currentFile--;
        }
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    keepImage() {
        this.fileSet[this.currentFile].action = new KeepAction();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    retouchImage() {
        this.fileSet[this.currentFile].action = new RetouchAction();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    privateImage() {
        this.fileSet[this.currentFile].action = new PrivateAction();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    deleteImage() {
        this.fileSet[this.currentFile].action = new DeleteAction();
    }

    /**
     * <p>Executes all the images' actions.</p>
     */
    organize() {
        this.fileSet.forEach(function (imageFile: ImageFile) {
            imageFile.execute();
        });
    }

    /**
     * <p>Callback from fs.readdir to  load all images that are under dirPath and select the first one
     * as current image.</p>
     * @param err Errors.
     * @param files Array with file name's from directory.
     */
    loadFiles(err: NodeJS.ErrnoException, files: string[]): void {
        //TODO check errors
        //TODO check no files in directory
        //TODO check no images in directory
        this.fileSet = [];
        this.currentFile = 0;

        files.forEach((it) => {
            var filePath = this.dirPath + '/' + it;

            if (fs.statSync(filePath).isFile()) {
                this.fileSet.push(new ImageFile(filePath));
            }
        });

    }

}