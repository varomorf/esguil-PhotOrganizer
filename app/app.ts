/**
 * Created by Alvaro on 24/09/2016.
 */

import {Component} from '@angular/core';
import * as fs from "fs";
import {ImageFile, KeepAction, RetouchAction, PrivateAction, DeleteAction} from "./components/imageFile";
import {remote} from 'electron';

let dialog = remote.dialog;

@Component({
    selector: 'app',
    template: `
    <button id="openDir" (click)="openDir()">Open</button>
        <input id="dirPath" type="text" disabled value="{{dirPath}}"/>
        <br />
        <img id="processingImage" src="{{currentImg}}"/>
        <br/>
        <button id="prevImage" (click)="prevImage()">Previous Image</button>
        <button id="keepImage" (click)="keepImage()">Keep</button>
        <button id="retouchImage" (click)="retouchImage()">Retouch</button>
        <button id="privateImage" (click)="privateImage()">Private</button>
        <button id="deleteImage" (click)="deleteImage()">Delete</button>
        <button id="nextImage" (click)="nextImage()">Next Image</button>
        <button id="organize" (click)="organize()">Organize</button>
  `
})

export class AppComponent {

    dirPath: string;
    currentImg: string;
    fileSet: ImageFile[] = [];
    currentFile: number = 0;

    constructor() {
        this.dirPath = "";
        this.currentImg = "";
    }

    /**
     * <p>Shows a dialog for opening the directory to be processed.</p>
     * <p>After a directory is selected, it will be analyzed and all images will be loaded to be organized.</p>
     */
    openDir() {
        dialog.showOpenDialog({defaultPath: 'C:\\', properties: ['openDirectory']}, (fileNames) => {
            //TODO assert only one file name is present
            this.dirPath = fileNames[0];
            fs.readdir(this.dirPath, (e, f) => this.loadFiles(e, f));
        });
    }

    /**
     * <p>Shows the next picture of the fileset (as long as it holds at least one image).</p>
     * <p>If the last image was selected, no changes will be done.</p>
     */
    nextImage() {
        if (this.currentFile < this.fileSet.length - 1) {
            this.currentFile++;
            this.currentImg = this.fileSet[this.currentFile].path;
        }
    }

    /**
     * <p>Shows the previous picture of the fileset (as long as it holds at least one image).</p>
     * <p>If the first image was selected, no changes will be done.</p>
     */
    prevImage() {
        if (this.currentFile != 0) {
            this.currentFile--;
            this.currentImg = this.fileSet[this.currentFile].path;
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

    // INTERNAL METHODS

    /**
     * <p>Callback from fs.readdir to  load all images that are under dirPath and select the first one
     * as current image.</p>
     * @param err Errors.
     * @param files Array with file name's from directory.
     */
    loadFiles(err: NodeJS.ErrnoException, files: string[]): void {
        //TODO quitar logs de debug
        console.log("llega");
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
        this.currentImg = this.fileSet[0].path;
        console.log(this.currentImg);
        console.log(this.fileSet);
    }

}