function MainCtl($scope, $route) {
    $scope.sections = [
        {
            id : '/',
            title : 'Home'
        },
        {
            id : 'files',
            title : 'Files'
        },
        {
            id : 'timer',
            title : 'Tomato Timer'
        }
    ];

    $scope.sectionClass=function(section){
        if ($route.current && $route.current.scope && $route.current.scope.id == section.id) {
            return 'active';
        }
        return "";
    };
    
}

function HomeController($scope, $routeParams, Data){
    $scope.id = '/';
    $scope.resume = Data.resume;
}

function FilesController($scope, $routeParams, Data) {
    $scope.id = 'files';
    $scope.files = Data.files;
}


function TimerController($scope, $routeParams) {
    $scope.id = 'timer';
    
}

var myApp = angular.module('myApp',['ngRoute']);

myApp.factory('Data', function () {
    var obj = {};
    var resume = {
        title : 'Resume',
        url : 'XiaozhongPanResume.pdf'
    };
    obj.resume = resume;
    obj.files = [
        resume,
        {
            title : 'Virginia Tech Unofficial Academic Transcript',
            url : 'XiaozhongPanUnofficialAcademicTranscipt.pdf'
        }
    ];
    return obj;
});


myApp.controller('MainCtl', MainCtl);
myApp.controller('HomeController', HomeController);
myApp.controller('FilesController', FilesController);
myApp.controller('TimerController', TimerController);
myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'parts/home.html',
    controller: 'HomeController'
  })
  .when('/files', {
    templateUrl: 'parts/files.html',
    controller: 'FilesController'
  })
  .when('/timer', {
    templateUrl: 'parts/timer.html',
    controller: 'TimerController'
  })
  .otherwise({
    redirectTo: '/'
  });

  // configure html5 to get links working on jsfiddle
  // $locationProvider.html5Mode({
  //       enabled: true,
  //       requireBase: false
  //   });
});


console.log("define Controllers");