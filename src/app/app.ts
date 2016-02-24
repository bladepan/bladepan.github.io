/// <reference path="../../typings/tsd.d.ts" />


module bladepan.site {

 
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

    setRoute(section: Section): void{
      console.log('go to ' + section.id);
      this.$state.go(section.id);
    }

    isSectionActive(section: Section): boolean {
      return this.$state.current.name === section.id
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
      let visibleFiles = _.filter(this.files, function(file) { 
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

  let dataFiles = new DataFiles();
  dataFiles.resume = new DataFile('Resume', 'XiaozhongPanResume.pdf', true);
  dataFiles.files = [dataFiles.resume, 
    new DataFile('Virginia Tech Unofficial Academic Transcript', 'XiaozhongPanUnofficialAcademicTranscipt.pdf', true)
  ];

  class ConfigFn {
    static $inject = ['$stateProvider', '$urlRouterProvider'];
    constructor($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
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
  }

  angular.module('bladepan.site', ['ui.router', 'ngMaterial'], ConfigFn);
  angular.module('bladepan.site').constant('DataFiles', dataFiles);
  angular.module('bladepan.site').controller(AppController.name, AppController)
    .controller('HomeController', HomeController).controller('FilesController', FilesController);
  
}

