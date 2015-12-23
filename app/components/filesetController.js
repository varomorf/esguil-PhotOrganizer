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

        // ATTRIBUTES

        var fs = require('fs');
        var remote = require('remote');
        var dialog = remote.require('dialog');

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
         * <p>If the next image was selected, the next image will be the first one.</p>
         * <p>TODO when the last image is shown and the next one is requested, show alert to user.</p>
         */
        function nextImage() {
            currentFile++;
            if (currentFile == fileSet.length) {
                currentFile = 0;
            }

            $scope.currentImg = fileSet[currentFile];
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
                    fileSet.push(filePath);
                }
            });
            $scope.$apply(function () {
                $scope.currentImg = fileSet[0];
            });
        }

    }

})();
