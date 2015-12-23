/**
 * Created by Alvaro on 23/12/2015.
 */
(function () {
    'use strict';

    angular.module('photo-organizer').controller('filesetController', ['$scope', FilesetController]);

    function FilesetController($scope) {
        // INTERFACE

        $scope.dirPath = '';
        $scope.openDir = openDir;

        // ATTRIBUTES

        var fs = require('fs');
        var remote = require('remote');
        var dialog = remote.require('dialog');

        var fileSet = [];

        // PUBLIC METHODS

        function openDir() {
            dialog.showOpenDialog({defaultPath: 'C:\\', properties: ['openDirectory']}, function (fileNames) {
                //TODO assert only one file name is present
                $scope.$apply(function () {
                    $scope.dirPath = fileNames[0];
                    fs.readdir($scope.dirPath, loadFiles);
                });
            });
        }

        // INTERNAL METHODS

        function loadFiles(err, files) {
            fileSet = [];
            //TODO check errors
            files.forEach(function (it) {
                var filePath = $scope.dirPath + '/' + it;

                if (fs.statSync(filePath).isFile()) {
                    fileSet.push(filePath);
                }
            });
        }

    }

})();
