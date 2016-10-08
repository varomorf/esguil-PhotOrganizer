/**
 * Created by Alvaro on 24/09/2016.
 */

import {Component} from '@angular/core';
import * as fs from "fs";
import {remote} from 'electron';
import {
    DomSanitizationService,
    SafeUrl
} from '@angular/platform-browser';
import {Observable} from "rxjs";
import {FileSet} from "./files/FileSet";


let dialog = remote.dialog;

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    /**
     * The image currently been shown.
     */
    currentImg: Observable<SafeUrl>;

    /**
     * The fileset we're working on.
     * @type {FileSet}
     */
    fileSet: FileSet = new FileSet();

    constructor(private sanitization: DomSanitizationService) {
        this.currentImg = Observable.of<SafeUrl>(null);
    }

    /**
     * <p>Shows a dialog for opening the directory to be processed.</p>
     * <p>After a directory is selected, it will be analyzed and all images will be loaded to be organized.</p>
     */
    openDir() {
        new Promise((resolve, reject) => {
            dialog.showOpenDialog({defaultPath: 'C:\\', properties: ['openDirectory']}, (fileNames) => {
                this.fileSet.dirPath = fileNames[0];
                fs.readdir(this.fileSet.dirPath, (e, f) => {
                    this.fileSet.loadFiles(e, f);

                    // end the promise
                    resolve();
                });
            })
        }).then(() => this.setSanitizedCurrentImage());
    }

    /**
     * Sets the currently shown image sanitazing its URL so Angular doesn't complain.
     */
    setSanitizedCurrentImage() {
        let currentPath = this.fileSet.getCurrentImagePath();
        this.currentImg = Observable.of(this.sanitization.bypassSecurityTrustUrl(currentPath));
    }

    /**
     * <p>Shows the next picture of the fileset (as long as it holds at least one image).</p>
     * <p>If the last image was selected, no changes will be done.</p>
     */
    nextImage() {
        this.fileSet.nextImage();
        this.setSanitizedCurrentImage();
    }

    /**
     * <p>Shows the previous picture of the fileset (as long as it holds at least one image).</p>
     * <p>If the first image was selected, no changes will be done.</p>
     */
    prevImage() {
        this.fileSet.prevImage();
        this.setSanitizedCurrentImage();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    keepImage() {
        this.fileSet.keepImage();
        this.nextImage();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    retouchImage() {
        this.fileSet.retouchImage();
        this.nextImage();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    privateImage() {
        this.fileSet.privateImage();
        this.nextImage();
    }

    /**
     * <p>Marks the current image to be kept.</p>
     */
    deleteImage() {
        this.fileSet.deleteImage();
        this.nextImage();
    }

    /**
     * <p>Executes all the images' actions.</p>
     */
    organize() {
        this.fileSet.organize();
    }

}