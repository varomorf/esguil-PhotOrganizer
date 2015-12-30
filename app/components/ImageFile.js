/**
 * Created by Alvaro on 26/12/2015.
 */

(function () {

    'use strict';

    var p = require('path');
    var fs = require('fs');

    exports.ImageFile = function ImageFile(path) {
        this.path = path;
        this.action = new NullAction();

        this.keepImage = function () {
            this.action = new KeepAction();
        };

        this.retouchImage = function () {
            this.action = new RetouchAction();
        };

        this.privateImage = function () {
            this.action = new PrivateAction();
        };

        this.deleteImage = function () {
            this.action = new DeleteAction();
        };

        this.execute = function () {
            this.action.execute(this.path);
        };
    };

    function NullAction() {
        this.name = 'No action';

        this.execute = function (path) {
            console.log('Executing action NullAction on path: ' + path);
        };
    }

    function KeepAction() {
        this.name = 'Keep';

        this.execute = function (path) {
            var keepDir = p.dirname(path) + '/keep';
            var newPath = keepDir + '/' + p.basename(path);

            console.log('Executing action Keep on path: ' + path + ' to dir:' + newPath);
            //TODO check if dir is already created
            fs.mkdirSync(keepDir);
            fs.renameSync(path, newPath);
        };
    }

    function RetouchAction() {
        this.name = 'Retouch';

        this.execute = function (path) {
            //TODO do actual func
            console.log('Executing action RetouchAction on path: ' + path);
        };
    }

    function PrivateAction() {
        this.name = 'Private';

        this.execute = function (path) {
            //TODO do actual func
            console.log('Executing action PrivateAction on path: ' + path);
        };
    }

    function DeleteAction() {
        this.name = 'Delete';

        this.execute = function (path) {
            //TODO do actual func
            console.log('Executing action DeleteAction on path: ' + path);
        };
    }

})();
