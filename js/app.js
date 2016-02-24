/// <reference path="../../typings/tsd.d.ts" />
var bladepan;
(function (bladepan) {
    var site;
    (function (site) {
        var Section = (function () {
            function Section(id, title) {
                this.id = id;
                this.title = title;
            }
            return Section;
        }());
        var AppController = (function () {
            function AppController($state) {
                this.$state = $state;
                this.sections = [new Section('home', 'Home'), new Section('files', 'Files')];
            }
            AppController.prototype.setRoute = function (section) {
                console.log('go to ' + section.id);
                this.$state.go(section.id);
            };
            AppController.prototype.isSectionActive = function (section) {
                return this.$state.current.name === section.id;
            };
            AppController.$inject = ['$state'];
            AppController.name = 'AppController';
            return AppController;
        }());
        var HomeController = (function () {
            function HomeController(dataFiles) {
                this.resume = dataFiles.resume;
            }
            HomeController.$inject = ['DataFiles'];
            return HomeController;
        }());
        var FilesController = (function () {
            function FilesController(dataFiles) {
                this.files = dataFiles.files;
                var visibleFiles = _.filter(this.files, function (file) {
                    return file.hide !== true;
                });
                this.visibleFileCount = visibleFiles.length;
            }
            FilesController.$inject = ['DataFiles'];
            return FilesController;
        }());
        var DataFile = (function () {
            function DataFile(title, url, hide) {
                this.title = title;
                this.url = url;
                this.hide = hide;
            }
            return DataFile;
        }());
        var DataFiles = (function () {
            function DataFiles() {
            }
            return DataFiles;
        }());
        var dataFiles = new DataFiles();
        dataFiles.resume = new DataFile('Resume', 'XiaozhongPanResume.pdf', true);
        dataFiles.files = [dataFiles.resume,
            new DataFile('Virginia Tech Unofficial Academic Transcript', 'XiaozhongPanUnofficialAcademicTranscipt.pdf', true)
        ];
        var ConfigFn = (function () {
            function ConfigFn($stateProvider, $urlRouterProvider) {
                $stateProvider.state('home', {
                    url: '',
                    controller: HomeController,
                    controllerAs: 'vm',
                    templateUrl: '/parts/home.html'
                }).state('files', {
                    url: '/files',
                    controller: FilesController,
                    controllerAs: 'vm',
                    templateUrl: '/parts/files.html'
                });
                $urlRouterProvider.otherwise('');
            }
            ConfigFn.$inject = ['$stateProvider', '$urlRouterProvider'];
            return ConfigFn;
        }());
        angular.module('bladepan.site', ['ui.router', 'ngMaterial'], ConfigFn);
        angular.module('bladepan.site').constant('DataFiles', dataFiles);
        angular.module('bladepan.site').controller(AppController.name, AppController)
            .controller('HomeController', HomeController).controller('FilesController', FilesController);
    })(site = bladepan.site || (bladepan.site = {}));
})(bladepan || (bladepan = {}));
