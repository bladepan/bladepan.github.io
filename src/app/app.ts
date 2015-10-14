/// <reference path="../../typings/tsd.d.ts" />


module bladepan.site {

  class ConfigFn{
    static $inject = ['$stateProvider', '$urlRouterProvider'];
    constructor($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
      $stateProvider.state('home', {
        url : '',
        controller : 'HomeController',
        controllerAs : 'vm',
        templateUrl : '/parts/home.html'
      }).state('files', {
        url: '/files',
        controller: 'FilesController',
        controllerAs: 'vm',
        templateUrl : '/parts/files.html'
      });
      $urlRouterProvider.otherwise('');
    }

  }

  class Section{
    constructor(public id:string, public title:string){}
  }

  class AppController {
    static $inject = ['$state'];
    static name: string = 'AppController';
    private sections :[Section];
    constructor(private $state: angular.ui.IStateService) {
      this.sections = [new Section('home', 'Home'), new Section('files', 'Files')];
    }

    sectionClass(section: Section): string {
      if (this.$state.current.name === section.id) {
        return 'active';
      }
    }

  }

  class HomeController{
    static $inject = ['DataFiles'];
    private resume: DataFile;
    constructor(dataFiles : DataFiles) {
      this.resume = dataFiles.resume;
    }
  }

  class FilesController{
    static $inject = ['DataFiles'];
    private files: [DataFile];
    private visibleFileCount: number;
    constructor(dataFiles: DataFiles) {
      this.files = dataFiles.files;
      var visibleFiles = _.filter(this.files, function(file) { 
        return file.hide !== true;
      });
      this.visibleFileCount = visibleFiles.length;
    } 
  }

  class DataFile {
    constructor(public title:string, public url:string, public hide:boolean){}
  }

  class DataFiles {
    public resume: DataFile;
    public files: [DataFile];
  }

  var dataFiles = new DataFiles();
  dataFiles.resume = new DataFile('Resume', 'XiaozhongPanResume.pdf', true);
  dataFiles.files = [dataFiles.resume, 
    new DataFile('Virginia Tech Unofficial Academic Transcript', 'XiaozhongPanUnofficialAcademicTranscipt.pdf', true)
  ];

  angular.module('bladepan.site', ['ui.router'], ConfigFn);
  angular.module('bladepan.site').constant('DataFiles', dataFiles);
  angular.module('bladepan.site').controller(AppController.name, AppController)
    .controller('HomeController', HomeController).controller('FilesController', FilesController);
  
}

