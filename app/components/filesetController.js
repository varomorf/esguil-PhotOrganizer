/**
 * Created by Alvaro on 23/12/2015.
 */
(function () {
    'use strict';

    angular.module('photo-organizer').controller('filesetController', ['$scope', FilesetController]);

    function FilesetController($scope) {
        // INTERFACE

        $scope.dirPath = '';
        $scope.currentImg = '';
        $scope.openDir = openDir;
        $scope.nextImage = nextImage;
        $scope.prevImage = prevImage;
        $scope.keepImage = keepImage;
        $scope.organize = organize;

        // ATTRIBUTES

        var fs = require('fs');
        var remote = require('remote');
        var dialog = remote.require('dialog');
        var imgFile = require('./components/imageFile.js');

        var fileSet = [];
        var currentFile = 0;

        // PUBLIC METHODS

        /**
         * <p>Shows a dialog for opening the directory to be processed.</p>
         * <p>After a directory is selected, it will be analyzed and all images will be loaded to be organized.</p>
         */
        function openDir() {
            dialog.showOpenDialog({defaultPath: 'C:\\', properties: ['openDirectory']}, function (fileNames) {
                //TODO assert only one file name is present
                $scope.$apply(function () {
                    $scope.dirPath = fileNames[0];
                });
                fs.readdir($scope.dirPath, loadFiles);
            });
        }

        /**
         * <p>Shows the next picture of the fileset (as long as it holds at least one image).</p>
         * <p>If the last image was selected, no changes will be done.</p>
         */
        function nextImage() {
            if (currentFile < fileSet.length - 1) {
                currentFile++;
                $scope.currentImg = fileSet[currentFile].path;
            }
        }

        /**
         * <p>Shows the previous picture of the fileset (as long as it holds at least one image).</p>
         * <p>If the first image was selected, no changes will be done.</p>
         */
        function prevImage() {
            if (currentFile != 0) {
                currentFile--;
                $scope.currentImg = fileSet[currentFile].path;
            }
        }

        /**
         * <p>Marks the current image to be kept.</p>
         */
        function keepImage() {
            fileSet[currentFile].keepImage();
        }

        /**
         * <p>Executes all the images' actions.</p>
         */
        function organize() {
            fileSet.forEach(function (imageFile) {
                imageFile.execute();
            });
        }

        // INTERNAL METHODS

        /**
         * <p>Callback from fs.readdir to  load all images that are under $scope.dirPath and select the first one
         * as current image.</p>
         * @param err Errors.
         * @param files Array with file name's from directory.
         */
        function loadFiles(err, files) {
            //TODO check errors
            //TODO check no files in directory
            //TODO check no images in directory
            fileSet = [];
            currentFile = 0;

            files.forEach(function (it) {
                var filePath = $scope.dirPath + '/' + it;

                if (fs.statSync(filePath).isFile()) {
                    fileSet.push(new imgFile.ImageFile(filePath));
                }
            });
            $scope.$apply(function () {
                $scope.currentImg = fileSet[0].path;
            });
        }

    }

})();
