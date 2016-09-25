"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const fs = require("fs");
const imageFile_1 = require("./components/imageFile");
const electron_1 = require('electron');
let dialog = electron_1.remote.dialog;
let AppComponent = class AppComponent {
    constructor() {
        this.fileSet = [];
        this.currentFile = 0;
        this.dirPath = "";
        this.currentImg = "";
    }
    openDir() {
        dialog.showOpenDialog({ defaultPath: 'C:\\', properties: ['openDirectory'] }, (fileNames) => {
            this.dirPath = fileNames[0];
            fs.readdir(this.dirPath, (e, f) => this.loadFiles(e, f));
        });
    }
    nextImage() {
        if (this.currentFile < this.fileSet.length - 1) {
            this.currentFile++;
            this.currentImg = this.fileSet[this.currentFile].path;
        }
    }
    prevImage() {
        if (this.currentFile != 0) {
            this.currentFile--;
            this.currentImg = this.fileSet[this.currentFile].path;
        }
    }
    keepImage() {
        this.fileSet[this.currentFile].action = new imageFile_1.KeepAction();
    }
    retouchImage() {
        this.fileSet[this.currentFile].action = new imageFile_1.RetouchAction();
    }
    privateImage() {
        this.fileSet[this.currentFile].action = new imageFile_1.PrivateAction();
    }
    deleteImage() {
        this.fileSet[this.currentFile].action = new imageFile_1.DeleteAction();
    }
    organize() {
        this.fileSet.forEach(function (imageFile) {
            imageFile.execute();
        });
    }
    loadFiles(err, files) {
        console.log("llega");
        this.fileSet = [];
        this.currentFile = 0;
        files.forEach((it) => {
            var filePath = this.dirPath + '/' + it;
            if (fs.statSync(filePath).isFile()) {
                this.fileSet.push(new imageFile_1.ImageFile(filePath));
            }
        });
        this.currentImg = this.fileSet[0].path;
        console.log(this.currentImg);
        console.log(this.fileSet);
    }
};
AppComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map